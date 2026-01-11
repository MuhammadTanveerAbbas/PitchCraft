'use client'

import { useUsage } from '@/hooks/use-usage'
import { useAuth } from '@/contexts/auth-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, Crown, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export function UsageBanner() {
  const { user } = useAuth()
  const { usage, loading } = useUsage()

  if (!user || loading || !usage) return null

  const percentage = (usage.used_today / usage.daily_limit) * 100
  const isNearLimit = percentage >= 80
  const isAtLimit = usage.remaining === 0

  return (
    <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/20 p-4 mb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {usage.plan === 'premium' ? (
            <Crown className="w-5 h-5 text-yellow-400" />
          ) : (
            <Zap className="w-5 h-5 text-cyan-400" />
          )}
          <div>
            <p className="text-sm font-medium text-white">
              {usage.plan === 'premium' ? 'Premium Plan' : 'Free Plan'}
            </p>
            <p className="text-xs text-gray-400">
              {usage.remaining} of {usage.daily_limit} generations remaining today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-32 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                isAtLimit
                  ? 'bg-red-500'
                  : isNearLimit
                  ? 'bg-yellow-500'
                  : 'bg-cyan-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          {usage.plan === 'free' && isNearLimit && (
            <Link href="/pricing">
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0">
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}
