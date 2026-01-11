'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      setTimeout(() => setLoading(false), 1500);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-zinc-400">Confirming your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 border-2 border-green-500 rounded-2xl p-8 mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold font-display mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-zinc-300 mb-6">
            Welcome to PitchCraft Premium! Your subscription is now active.
          </p>
          <div className="bg-zinc-900 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">What&apos;s included:</h3>
            <ul className="text-sm text-zinc-400 space-y-1">
              <li>✓ 50 pitch generations per day</li>
              <li>✓ 2x faster generation speed</li>
              <li>✓ Advanced AI insights</li>
              <li>✓ Competitor analysis</li>
              <li>✓ Financial projections</li>
              <li>✓ Priority support</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
            asChild
          >
            <Link href="/tool">Start Creating Pitches</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/pricing">Manage Subscription</Link>
          </Button>
        </div>

        <p className="text-xs text-zinc-500 mt-6">
          Session ID: {sessionId}
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
