import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: generations, error: genError } = await supabase
      .from('generation_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (genError) throw genError;

    const today = new Date().toISOString().split('T')[0];
    const todayCount = generations?.filter(g => g.created_at.startsWith(today)).length || 0;
    const totalCount = generations?.length || 0;

    const { data: savedPitches, error: savedError } = await supabase
      .from('saved_pitches')
      .select('id')
      .eq('user_id', user.id);

    if (savedError) throw savedError;

    const savedCount = savedPitches?.length || 0;

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status, plan')
      .eq('user_id', user.id)
      .single();

    const plan = subscription?.status === 'active' && subscription?.plan === 'premium' ? 'Premium' : 'Free';
    const dailyLimit = plan === 'Premium' ? 50 : 5;

    // Weekly data
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];
      const count = generations?.filter(g => g.created_at.startsWith(dateStr)).length || 0;
      return { day: weekDays[date.getDay()], count };
    });

    // Top industry
    const industries = generations?.map(g => g.industry).filter(Boolean) || [];
    const industryCounts = industries.reduce((acc: Record<string, number>, ind: string) => {
      acc[ind] = (acc[ind] || 0) + 1;
      return acc;
    }, {});
    const topIndustry = Object.keys(industryCounts).sort((a, b) => industryCounts[b] - industryCounts[a])[0] || 'N/A';

    // Monthly count
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthlyCount = generations?.filter(g => g.created_at.startsWith(currentMonth)).length || 0;

    // Average viability score
    const viabilityScores = generations?.map(g => g.viability_score).filter(Boolean) || [];
    const avgViabilityScore = viabilityScores.length > 0 
      ? viabilityScores.reduce((a, b) => a + b, 0) / viabilityScores.length 
      : 0;

    // Last generated
    const lastGenerated = generations && generations.length > 0
      ? new Date(generations[0].created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      : 'Never';

    return NextResponse.json({
      todayCount,
      totalCount,
      savedCount,
      plan,
      weeklyData,
      topIndustry,
      monthlyCount,
      avgViabilityScore,
      lastGenerated,
      dailyLimit
    });
  } catch (error) {
    console.error('Analytics error');
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
