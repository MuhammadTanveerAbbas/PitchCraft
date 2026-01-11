import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { downgradeToFree, shouldSendRenewalReminder, markReminderSent } from '@/lib/subscription';

export async function GET() {
  try {
    const { data: users } = await supabase
      .from('users')
      .select('*')
      .in('subscription_status', ['active', 'trialing', 'past_due']);

    if (!users) return NextResponse.json({ processed: 0 });

    let downgraded = 0;
    let reminders = 0;

    for (const user of users) {
      if (user.subscription_status === 'past_due' && user.grace_period_end) {
        const gracePeriodEnd = new Date(user.grace_period_end);
        if (new Date() > gracePeriodEnd) {
          await downgradeToFree(user.id);
          downgraded++;
        }
      }

      if (await shouldSendRenewalReminder(user.id)) {
        await markReminderSent(user.id);
        reminders++;
      }
    }

    return NextResponse.json({ downgraded, reminders });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
