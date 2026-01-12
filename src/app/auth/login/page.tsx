'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      })
      router.push('/dashboard')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-3">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="w-full max-w-[340px] sm:max-w-sm relative z-10">
        <Link href="/" className="flex items-center gap-2 mb-6 sm:mb-8 justify-center group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition" />
            <img src="/icon.svg" alt="PitchCraft" className="w-7 h-7 relative" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">PitchCraft</span>
        </Link>
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-1 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Welcome Back</h1>
          <p className="text-xs text-gray-400 text-center mb-5 sm:mb-6">Sign in to continue</p>

          <form onSubmit={handleLogin} className="space-y-3.5 sm:space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs text-gray-400 mb-1.5 block">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/50 border-white/20 h-9 sm:h-10 text-sm focus:border-cyan-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-xs text-gray-400 mb-1.5 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-black/50 border-white/20 h-9 sm:h-10 pr-9 text-sm focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link href="/auth/reset-password" className="text-xs text-gray-500 hover:text-cyan-400 transition">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white h-9 sm:h-10 font-semibold text-sm shadow-lg shadow-cyan-500/20">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center mt-4 sm:mt-5 text-xs text-gray-500">
            No account? <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
