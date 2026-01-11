'use client';

import { useState } from 'react';
import { Check, X, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for testing your first ideas',
    features: [
      '5 pitch generations per day',
      'Basic pitch structure',
      'Market analysis',
      'MVP roadmap',
      'Markdown export',
      'Viability rating',
    ],
    limitations: [
      'Advanced AI insights',
      'Priority generation',
      'Custom branding',
      'API access',
    ],
    cta: 'Start Free',
    popular: false,
    icon: Sparkles,
  },
  {
    name: 'Premium',
    price: { monthly: 20, yearly: 192 },
    description: 'For serious founders building multiple ventures',
    features: [
      '50 pitch generations per day',
      'Advanced AI insights',
      'Priority generation (2x faster)',
      'Detailed competitor analysis',
      'Financial projections',
      'Custom pitch templates',
      'Team collaboration',
      'Priority support',
      'API access',
      'Remove PitchCraft branding',
    ],
    limitations: [],
    cta: 'Upgrade to Premium',
    popular: true,
    icon: Zap,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ billingCycle }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to start checkout. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold font-display flex items-center gap-2">
            <img src="/icon.svg" alt="PitchCraft" className="w-8 h-8" />
            PitchCraft 🚀
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Start free and upgrade when you need more power. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-zinc-900 p-1.5 rounded-full">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
            const displayPrice = billingCycle === 'yearly' ? price / 12 : price;

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-2 border-blue-500'
                    : 'bg-zinc-900 border border-zinc-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${plan.popular ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-display">{plan.name}</h3>
                </div>

                <p className="text-zinc-400 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold font-display">
                      ${displayPrice.toFixed(0)}
                    </span>
                    <span className="text-zinc-400">/month</span>
                  </div>
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <p className="text-sm text-zinc-500 mt-1">
                      Billed ${plan.price.yearly}/year
                    </p>
                  )}
                </div>

                {plan.name === 'Free' ? (
                  <Button
                    className="w-full mb-6 bg-zinc-800 hover:bg-zinc-700"
                    size="lg"
                    asChild
                  >
                    <Link href="/auth/signup">
                      {plan.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                    onClick={handleUpgrade}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : plan.cta}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-3 pt-6 border-t border-zinc-800">
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start gap-3">
                        <X className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-zinc-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
