import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUserUsage, incrementUsage } from '@/lib/supabase/database'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const usage = await getUserUsage(user.id)
    return NextResponse.json(usage)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const usage = await getUserUsage(user.id)
    
    if (usage.remaining <= 0) {
      return NextResponse.json(
        { error: 'Daily limit reached', usage },
        { status: 429 }
      )
    }

    await incrementUsage(user.id)
    const updatedUsage = await getUserUsage(user.id)
    
    return NextResponse.json(updatedUsage)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
