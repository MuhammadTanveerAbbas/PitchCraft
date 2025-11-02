import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black sticky top-0 z-50">
        <div className="h-16 flex items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-bold text-xl">PitchCraft</span>
          </Link>
          <Link href="/tool">
            <Button size="sm">Try Free</Button>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            💰 Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start free, upgrade when you need more. No hidden fees, no
            surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Free Plan */}
          <Card className="p-8 relative">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">Free</CardTitle>
              <div className="text-4xl font-bold mb-4">$0</div>
              <p className="text-muted-foreground">
                Perfect for testing your ideas
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px #06b6d4)'}} />
                  <span>3 pitch generations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px #06b6d4)'}} />
                  <span>Basic export to Markdown</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px #06b6d4)'}} />
                  <span>All core features</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px #06b6d4)'}} />
                  <span>Industry insights</span>
                </li>
              </ul>
              <Link href="/tool" className="block">
                <Button className="w-full" variant="outline">
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 relative border-primary">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              Most Popular
            </Badge>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">Pro</CardTitle>
              <div className="text-4xl font-bold mb-4">
                $29<span className="text-lg text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">For serious entrepreneurs</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px #06b6d4)'}} />
                  <span>Unlimited pitch generations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px #06b6d4)'}} />
                  <span>Advanced export options</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px #06b6d4)'}} />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px #06b6d4)'}} />
                  <span>Custom branding</span>
                </li>
              </ul>
              <Button className="w-full">Start Pro Trial</Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">
                How does the free plan work?
              </h3>
              <p className="text-muted-foreground">
                You get 3 complete pitch generations per month, including all
                core features like industry insights, MVP roadmaps, and Markdown
                export. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">
                Can I cancel anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll
                continue to have access to Pro features until the end of your
                billing period.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">
                What's included in the Pro plan?
              </h3>
              <p className="text-muted-foreground">
                Unlimited pitch generations, advanced export formats, priority
                support, custom branding, and pitch history with version
                control.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 py-16 bg-white/5 border border-white/10 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Ready to craft your perfect pitch?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ founders who've already generated professional pitches
          </p>
          <Link href="/tool">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Free Now
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
