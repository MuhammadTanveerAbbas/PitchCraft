'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Crown, Check, Zap } from 'lucide-react'
import Link from 'next/link'

interface UpgradeModalProps {
  open: boolean
  onClose: () => void
}

export function UpgradeModal({ open, onClose }: UpgradeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border-cyan-500/20 text-white max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">Daily Limit Reached</DialogTitle>
          <DialogDescription className="text-gray-400 text-center">
            You've used all your free generations for today. Upgrade to Premium for more!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Premium Plan</h3>
              <div className="text-right">
                <div className="text-2xl font-bold">$9.99</div>
                <div className="text-xs text-gray-400">per month</div>
              </div>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm">50 pitch generations per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm">Priority AI processing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm">Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm">Export to multiple formats</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Maybe Later
            </Button>
            <Link href="/pricing" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 border-0">
                <Zap className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </Link>
          </div>

          <p className="text-xs text-center text-gray-500">
            Or wait until tomorrow for 5 more free generations
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
