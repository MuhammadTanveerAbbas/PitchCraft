import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: pitches } = await supabase
      .from('saved_pitches')
      .select('*')
      .eq('user_id', user.id)
      .order('is_favorite', { ascending: false })
      .order('created_at', { ascending: false });

    return NextResponse.json({ pitches: pitches || [] });
  } catch (error) {
    console.error('Saved pitches API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pitchName, pitchData } = await request.json();

    const { data, error } = await supabase
      .from('saved_pitches')
      .insert({
        user_id: user.id,
        pitch_name: pitchName,
        pitch_data: pitchData,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ pitch: data });
  } catch (error) {
    console.error('Save pitch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pitchId, isFavorite } = await request.json();

    const { error } = await supabase
      .from('saved_pitches')
      .update({ is_favorite: isFavorite })
      .eq('id', pitchId)
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update favorite error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const pitchId = searchParams.get('pitchId');

    const { error } = await supabase
      .from('saved_pitches')
      .delete()
      .eq('id', pitchId)
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete pitch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
