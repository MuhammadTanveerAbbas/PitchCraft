'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LayoutDashboard } from 'lucide-react'

export function UserMenu() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Link href="/auth/signup">
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-2 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm rounded-md sm:rounded-lg shadow-lg shadow-cyan-500/20 border-0">
          <span className="hidden sm:inline">Create Account</span>
          <span className="sm:hidden">Sign Up</span>
        </Button>
      </Link>
    )
  }

  return (
    <Link href="/dashboard">
      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-2 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 text-[10px] sm:text-xs md:text-sm rounded-md sm:rounded-lg shadow-lg shadow-cyan-500/20 border-0 flex items-center gap-1">
        <LayoutDashboard className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
        <span className="hidden sm:inline">Dashboard</span>
      </Button>
    </Link>
  )
}
