'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'

export function UserMenu() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="w-24 h-10 rounded-lg bg-white/10 animate-pulse" />
  }

  if (!user) {
    return (
      <Link href="/auth/signup">
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 rounded-lg shadow-lg shadow-cyan-500/20 border-0">
          Create Account
        </Button>
      </Link>
    )
  }

  return (
    <Link href="/dashboard">
      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 rounded-lg shadow-lg shadow-cyan-500/20 border-0 flex items-center gap-2">
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Button>
    </Link>
  )
}
