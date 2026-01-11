import { createClient } from './server'

export async function getUserProfile(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: {
  full_name?: string
  avatar_url?: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserSubscription(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function getUserUsage(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .rpc('get_user_usage', { p_user_id: userId })

  if (error) throw error
  return data?.[0] || { plan: 'free', daily_limit: 5, used_today: 0, remaining: 5 }
}

export async function incrementUsage(userId: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .rpc('increment_usage', { p_user_id: userId })

  if (error) throw error
}

export async function canGeneratePitch(userId: string): Promise<boolean> {
  const usage = await getUserUsage(userId)
  return usage.remaining > 0
}
