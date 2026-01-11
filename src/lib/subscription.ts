import { stripe } from './stripe';
import { supabase } from './supabase';
import Stripe from 'stripe';

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'incomplete_expired' | 'unpaid';
export type PlanType = 'free' | 'premium';

const GRACE_PERIOD_DAYS = 3;

export async function checkSubscriptionStatus(userId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (!user) return { status: 'free' as const, isActive: false };

  const status = user.subscription_status as SubscriptionStatus;
  const isActive = status === 'active' || status === 'trialing';
  const isPastDue = status === 'past_due';
  const gracePeriodEnd = user.grace_period_end ? new Date(user.grace_period_end) : null;
  const inGracePeriod = gracePeriodEnd ? new Date() < gracePeriodEnd : false;

  return {
    status,
    plan: user.plan as PlanType,
    isActive: isActive || (isPastDue && inGracePeriod),
    isPastDue,
    inGracePeriod,
    gracePeriodEnd,
    subscriptionId: user.subscription_id,
    currentPeriodEnd: user.current_period_end ? new Date(user.current_period_end) : null,
  };
}

export async function downgradeToFree(userId: string) {
  await supabase
    .from('users')
    .update({
      plan: 'free',
      subscription_status: 'canceled',
      subscription_id: null,
      grace_period_end: null,
    })
    .eq('id', userId);
}

export async function syncStripeSubscription(userId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('stripe_customer_id, subscription_id')
    .eq('id', userId)
    .single();

  if (!user?.subscription_id) return null;

  try {
    const subscription = await stripe.subscriptions.retrieve(user.subscription_id);
    
    await supabase
      .from('users')
      .update({
        subscription_status: subscription.status,
        plan: subscription.status === 'active' || subscription.status === 'trialing' ? 'premium' : 'free',
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .eq('id', userId);

    return subscription;
  } catch (error) {
    console.error('Failed to sync subscription:', error);
    return null;
  }
}

export async function getBillingHistory(userId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single();

  if (!user?.stripe_customer_id) return [];

  try {
    const invoices = await stripe.invoices.list({
      customer: user.stripe_customer_id,
      limit: 100,
    });

    return invoices.data.map(invoice => ({
      id: invoice.id,
      amount: invoice.amount_paid / 100,
      currency: invoice.currency.toUpperCase(),
      status: invoice.status,
      date: new Date(invoice.created * 1000),
      invoiceUrl: invoice.hosted_invoice_url,
      pdfUrl: invoice.invoice_pdf,
    }));
  } catch (error) {
    console.error('Failed to fetch billing history:', error);
    return [];
  }
}

export async function handleProration(userId: string, newPriceId: string) {
  const { data: user } = await supabase
    .from('users')
    .select('subscription_id')
    .eq('id', userId)
    .single();

  if (!user?.subscription_id) throw new Error('No active subscription');

  const subscription = await stripe.subscriptions.retrieve(user.subscription_id);
  
  await stripe.subscriptions.update(user.subscription_id, {
    items: [{
      id: subscription.items.data[0].id,
      price: newPriceId,
    }],
    proration_behavior: 'create_prorations',
  });

  return { success: true };
}

export async function setGracePeriod(userId: string) {
  const gracePeriodEnd = new Date();
  gracePeriodEnd.setDate(gracePeriodEnd.getDate() + GRACE_PERIOD_DAYS);

  await supabase
    .from('users')
    .update({
      grace_period_end: gracePeriodEnd.toISOString(),
    })
    .eq('id', userId);
}

export async function shouldSendRenewalReminder(userId: string): Promise<boolean> {
  const { data: user } = await supabase
    .from('users')
    .select('current_period_end, last_reminder_sent')
    .eq('id', userId)
    .single();

  if (!user?.current_period_end) return false;

  const periodEnd = new Date(user.current_period_end);
  const daysUntilRenewal = Math.ceil((periodEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const lastReminder = user.last_reminder_sent ? new Date(user.last_reminder_sent) : null;
  const daysSinceLastReminder = lastReminder 
    ? Math.ceil((Date.now() - lastReminder.getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  return (daysUntilRenewal === 7 || daysUntilRenewal === 3 || daysUntilRenewal === 1) 
    && daysSinceLastReminder > 1;
}

export async function markReminderSent(userId: string) {
  await supabase
    .from('users')
    .update({ last_reminder_sent: new Date().toISOString() })
    .eq('id', userId);
}
