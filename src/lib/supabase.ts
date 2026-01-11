import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type User = {
  id: string;
  email: string;
  stripe_customer_id?: string;
  subscription_status?: 'active' | 'canceled' | 'past_due' | null;
  subscription_id?: string;
  plan?: 'free' | 'premium';
  created_at: string;
};
