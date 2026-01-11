'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'

export interface UsageData {
  plan: 'free' | 'premium'
  daily_limit: number
  used_today: number
  remaining: number
}

export function useUsage() {
  const { user } = useAuth()
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsage = async () => {
    if (!user) {
      setUsage(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/usage')
      
      if (!response.ok) {
        throw new Error('Failed to fetch usage')
      }

      const data = await response.json()
      setUsage(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const incrementUsage = async (): Promise<boolean> => {
    if (!user) return false

    try {
      const response = await fetch('/api/usage', { method: 'POST' })
      
      if (response.status === 429) {
        const data = await response.json()
        setUsage(data.usage)
        return false
      }

      if (!response.ok) {
        throw new Error('Failed to increment usage')
      }

      const data = await response.json()
      setUsage(data)
      return true
    } catch (err: any) {
      setError(err.message)
      return false
    }
  }

  useEffect(() => {
    fetchUsage()
  }, [user])

  return {
    usage,
    loading,
    error,
    refetch: fetchUsage,
    incrementUsage,
    canGenerate: usage ? usage.remaining > 0 : false
  }
}
