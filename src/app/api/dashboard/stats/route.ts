import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch real stats from database
    const { data: generations } = await supabase
      .from('pitch_generations')
      .select('*')
      .eq('user_id', user.id);

    const today = new Date().toISOString().split('T')[0];
    const todayCount = generations?.filter(g => g.created_at.startsWith(today)).length || 0;
    const totalCount = generations?.length || 0;

    const { data: savedPitches } = await supabase
      .from('saved_pitches')
      .select('id')
      .eq('user_id', user.id);

    const savedCount = savedPitches?.length || 0;

    // Get subscription status
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status, plan_type')
      .eq('user_id', user.id)
      .single();

    const plan = subscription?.status === 'active' && subscription?.plan_type === 'premium' ? 'Premium' : 'Free';

    return NextResponse.json({
      todayCount,
      totalCount,
      savedCount,
      plan
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({
      todayCount: 0,
      totalCount: 0,
      savedCount: 0,
      plan: 'Free'
    });
  }
}
