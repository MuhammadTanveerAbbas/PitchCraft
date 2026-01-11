import { NextRequest, NextResponse } from 'next/server';
import { checkSubscriptionStatus, syncStripeSubscription } from '@/lib/subscription';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  try {
    await syncStripeSubscription(userId);
    const status = await checkSubscriptionStatus(userId);
    return NextResponse.json(status);
  } catch (error) {
    console.error('Failed to check subscription:', error);
    return NextResponse.json({ error: 'Failed to check subscription' }, { status: 500 });
  }
}
