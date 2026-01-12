"use client";

import { useState } from "react";
import { Check, X, Sparkles, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for testing your first ideas",
    features: [
      "5 pitch generations per day",
      "Basic pitch structure",
      "Market analysis",
      "MVP roadmap",
      "Markdown export",
      "Viability rating",
    ],
    limitations: [
      "Advanced AI insights",
      "Priority generation",
      "Custom branding",
      "API access",
    ],
    cta: "Start Free",
    popular: false,
    icon: Sparkles,
  },
  {
    name: "Premium",
    price: { monthly: 9, yearly: 86 },
    description: "For serious founders building multiple ventures",
    features: [
      "50 pitch generations per day",
      "Advanced AI insights",
      "Priority generation (2x faster)",
      "Detailed competitor analysis",
      "Financial projections",
      "Custom pitch templates",
      "Priority support",
      "API access",
    ],
    limitations: [],
    cta: "Upgrade to Premium",
    popular: true,
    icon: Zap,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          userId: user.id,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start checkout. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-lg sm:text-xl md:text-2xl font-bold font-display flex items-center gap-1.5 sm:gap-2"
          >
            <img
              src="/icon.svg"
              alt="PitchCraft"
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            PitchCraft 🚀
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm px-2 sm:px-4"
            >
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-2">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto mb-4 sm:mb-6 md:mb-8 px-2">
            Start free and upgrade when you need more power. No hidden fees,
            cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-2 sm:gap-4 bg-zinc-900 p-1 sm:p-1.5 rounded-full">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full transition-all text-xs sm:text-sm ${
                billingCycle === "monthly"
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full transition-all text-xs sm:text-sm ${
                billingCycle === "yearly"
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="ml-1 sm:ml-2 text-[10px] sm:text-xs bg-green-500/20 text-green-400 px-1.5 sm:px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 max-w-5xl mx-auto">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            const price =
              billingCycle === "monthly"
                ? plan.price.monthly
                : plan.price.yearly;
            const displayPrice = billingCycle === "yearly" ? price / 12 : price;

            return (
              <div
                key={plan.name}
                className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 transition-all ${
                  plan.popular
                    ? "bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-2 border-blue-500"
                    : "bg-zinc-900 border border-zinc-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div
                    className={`p-1.5 sm:p-2 rounded-lg ${
                      plan.popular ? "bg-blue-600" : "bg-zinc-800"
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display">
                    {plan.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 mb-4 sm:mb-6">
                  {plan.description}
                </p>

                <div className="mb-4 sm:mb-6">
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-display">
                      ${displayPrice.toFixed(0)}
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-400">
                      /month
                    </span>
                  </div>
                  {billingCycle === "yearly" && plan.price.yearly > 0 && (
                    <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                      Billed ${plan.price.yearly}/year
                    </p>
                  )}
                </div>

                {plan.name === "Free" ? (
                  <Button
                    className="w-full mb-4 sm:mb-6 bg-zinc-800 hover:bg-zinc-700 text-xs sm:text-sm"
                    size="lg"
                    asChild
                  >
                    <Link href="/auth/signup">
                      {plan.cta}
                      <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="w-full mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm"
                    size="lg"
                    onClick={handleUpgrade}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : plan.cta}
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                )}

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2 sm:gap-3"
                    >
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="space-y-2 sm:space-y-3 pt-4 sm:pt-6 border-t border-zinc-800">
                    {plan.limitations.map((limitation) => (
                      <div
                        key={limitation}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-zinc-500">
                          {limitation}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/icon.svg" alt="PitchCraft" className="w-6 h-6" />
              <span className="font-bold text-lg">PitchCraft</span>
            </div>
            <p className="text-sm text-zinc-400">
              © 2026 PitchCraft. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
