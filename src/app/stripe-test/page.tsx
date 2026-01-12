'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function StripeTestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testCheckout = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          userId: 'test-user-123',
        }),
      });
      const data = await res.json();
      setResult({ success: true, data });
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testPortal = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: 'cus_test123' }),
      });
      const data = await res.json();
      setResult({ success: true, data });
    } catch (error: any) {
      setResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Stripe Test Page</h1>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">Test Checkout Session</h2>
            <p className="text-zinc-400 mb-4">
              Creates a Stripe checkout session for Premium subscription
            </p>
            <Button onClick={testCheckout} disabled={loading} className="w-full">
              {loading ? 'Testing...' : 'Test Checkout'}
            </Button>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <h2 className="text-2xl font-bold mb-4">Test Customer Portal</h2>
            <p className="text-zinc-400 mb-4">
              Creates a Stripe customer portal session
            </p>
            <Button onClick={testPortal} disabled={loading} className="w-full">
              {loading ? 'Testing...' : 'Test Portal'}
            </Button>
          </Card>
        </div>

        {result && (
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <h3 className="text-xl font-bold mb-4">
              {result.success ? '✅ Success' : '❌ Error'}
            </h3>
            <pre className="bg-black p-4 rounded overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </Card>
        )}

        <Card className="p-6 bg-zinc-900 border-zinc-800 mt-6">
          <h3 className="text-xl font-bold mb-4">Environment Check</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>STRIPE_SECRET_KEY:</span>
              <span className={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'text-green-500' : 'text-red-500'}>
                {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✓ Set' : '✗ Missing'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>STRIPE_PREMIUM_PRICE_ID:</span>
              <span className="text-yellow-500">Check server logs</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
