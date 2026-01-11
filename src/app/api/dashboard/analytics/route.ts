import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: generations } = await supabase
      .from('generation_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    const today = new Date().toISOString().split('T')[0];
    const todayCount = generations?.filter(g => g.created_at.startsWith(today)).length || 0;
    const totalCount = generations?.length || 0;

    const { data: savedPitches } = await supabase
      .from('saved_pitches')
      .select('id')
      .eq('user_id', user.id);

    const savedCount = savedPitches?.length || 0;

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status, plan')
      .eq('user_id', user.id)
      .single();

    const plan = subscription?.status === 'active' && subscription?.plan === 'premium' ? 'Premium' : 'Free';

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
    const industryCounts = industries.reduce((acc: any, ind: string) => {
      acc[ind] = (acc[ind] || 0) + 1;
      return acc;
    }, {});
    const topIndustry = Object.keys(industryCounts).sort((a, b) => industryCounts[b] - industryCounts[a])[0] || 'N/A';

    return NextResponse.json({
      todayCount,
      totalCount,
      savedCount,
      plan,
      weeklyData,
      topIndustry
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({
      todayCount: 0,
      totalCount: 0,
      savedCount: 0,
      plan: 'Free',
      weeklyData: [],
      topIndustry: 'N/A'
    });
  }
}
