'use client';

import { useEffect, useState } from 'react';

type SubscriptionStatus = {
  status: string;
  plan: string;
  isActive: boolean;
  isPastDue: boolean;
  inGracePeriod: boolean;
  gracePeriodEnd: string | null;
  currentPeriodEnd: string | null;
};

export function useSubscription(userId: string | undefined) {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetchSubscription();
  }, [userId]);

  const fetchSubscription = async () => {
    try {
      const res = await fetch(`/api/subscription/status?userId=${userId}`);
      const data = await res.json();
      setSubscription(data);
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    if (userId) fetchSubscription();
  };

  return { subscription, loading, refresh };
}
