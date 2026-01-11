import { NextRequest, NextResponse } from 'next/server';
import { getBillingHistory } from '@/lib/subscription';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID required' }, { status: 400 });
  }

  try {
    const history = await getBillingHistory(userId);
    return NextResponse.json(history);
  } catch (error) {
    console.error('Failed to fetch billing history:', error);
    return NextResponse.json({ error: 'Failed to fetch billing history' }, { status: 500 });
  }
}
