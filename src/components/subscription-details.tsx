'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle, CreditCard, Download } from 'lucide-react';

type SubscriptionData = {
  status: string;
  plan: string;
  isActive: boolean;
  isPastDue: boolean;
  inGracePeriod: boolean;
  gracePeriodEnd: string | null;
  currentPeriodEnd: string | null;
};

type BillingItem = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  date: Date;
  invoiceUrl: string | null;
  pdfUrl: string | null;
};

export default function SubscriptionDetails({ userId }: { userId: string }) {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [billingHistory, setBillingHistory] = useState<BillingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionData();
  }, [userId]);

  const fetchSubscriptionData = async () => {
    try {
      const [subRes, billRes] = await Promise.all([
        fetch(`/api/subscription/status?userId=${userId}`),
        fetch(`/api/subscription/billing-history?userId=${userId}`),
      ]);

      const subData = await subRes.json();
      const billData = await billRes.json();

      setSubscription(subData);
      setBillingHistory(billData);
    } catch (error) {
      console.error('Failed to fetch subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!subscription) return null;

    if (subscription.isActive) {
      return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
    }
    if (subscription.isPastDue && subscription.inGracePeriod) {
      return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" />Grace Period</Badge>;
    }
    if (subscription.isPastDue) {
      return <Badge className="bg-red-500"><AlertTriangle className="w-3 h-3 mr-1" />Past Due</Badge>;
    }
    return <Badge variant="secondary"><XCircle className="w-3 h-3 mr-1" />Inactive</Badge>;
  };

  if (loading) {
    return <div className="animate-pulse bg-zinc-800 h-64 rounded-lg" />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Subscription</h2>
          {getStatusBadge()}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-zinc-400">Current Plan</p>
            <p className="text-xl font-semibold capitalize">{subscription?.plan || 'Free'}</p>
          </div>
          {subscription?.currentPeriodEnd && (
            <div>
              <p className="text-sm text-zinc-400">Renews On</p>
              <p className="text-xl font-semibold">
                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {subscription?.inGracePeriod && subscription.gracePeriodEnd && (
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-yellow-500">Payment Failed - Grace Period Active</p>
                <p className="text-sm text-zinc-300 mt-1">
                  Your subscription will be cancelled on{' '}
                  {new Date(subscription.gracePeriodEnd).toLocaleDateString()} if payment is not received.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={() => window.location.href = '/api/stripe/portal'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Manage Billing
          </Button>
          {subscription?.plan === 'free' && (
            <Button
              onClick={() => window.location.href = '/pricing'}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Upgrade to Premium
            </Button>
          )}
        </div>
      </Card>

      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <h3 className="text-xl font-bold mb-4">Billing History</h3>
        {billingHistory.length === 0 ? (
          <p className="text-zinc-400">No billing history available</p>
        ) : (
          <div className="space-y-3">
            {billingHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg"
              >
                <div>
                  <p className="font-semibold">
                    {item.currency} {item.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {new Date(item.date).toLocaleDateString()} • {item.status}
                  </p>
                </div>
                <div className="flex gap-2">
                  {item.invoiceUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(item.invoiceUrl!, '_blank')}
                    >
                      View
                    </Button>
                  )}
                  {item.pdfUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(item.pdfUrl!, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
