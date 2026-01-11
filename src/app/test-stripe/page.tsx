'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';

const testCards = [
  { number: '4242 4242 4242 4242', description: 'Successful payment', icon: CheckCircle, color: 'text-green-500' },
  { number: '4000 0000 0000 0002', description: 'Card declined', icon: XCircle, color: 'text-red-500' },
  { number: '4000 0025 0000 3155', description: 'Requires authentication', icon: CreditCard, color: 'text-yellow-500' },
];

export default function StripeTestPage() {
  const [result, setResult] = useState<string>('');

  const testCheckout = async (email: string) => {
    setResult('Creating checkout session...');
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userId: `test_${Date.now()}` }),
      });

      const data = await response.json();
      
      if (data.url) {
        setResult('Redirecting to Stripe checkout...');
        window.location.href = data.url;
      } else {
        setResult(`Error: ${data.error}`);
      }
    } catch (error) {
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-display mb-8">Stripe Integration Test</h1>

        <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-4">Test Cards</h2>
          <div className="space-y-4">
            {testCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.number} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg">
                  <Icon className={`w-6 h-6 ${card.color}`} />
                  <div className="flex-1">
                    <p className="font-mono font-semibold">{card.number}</p>
                    <p className="text-sm text-zinc-400">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
            <p className="text-sm text-zinc-300">
              <strong>Test Details:</strong> Use any future expiry (12/34), any CVC (123), any ZIP (12345)
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-4">Quick Test</h2>
          <Button
            onClick={() => testCheckout('test@example.com')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            Test Checkout Flow
          </Button>
          {result && (
            <div className="mt-4 p-4 bg-zinc-800 rounded-lg">
              <p className="text-sm">{result}</p>
            </div>
          )}
        </div>

        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-4">Setup Checklist</h2>
          <div className="space-y-2 text-sm">
            <p>✓ Install Stripe packages</p>
            <p>✓ Configure environment variables</p>
            <p>✓ Create Supabase table</p>
            <p>✓ Setup webhook endpoint</p>
            <p>✓ Test checkout flow</p>
          </div>
        </div>
      </div>
    </div>
  );
}
