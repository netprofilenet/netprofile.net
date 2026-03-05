'use client'

import { useEffect, useState } from 'react'

type HealthStatus = 'checking' | 'online' | 'offline' | 'unconfigured'

export function useServerHealth(serverUrl: string | null): { status: HealthStatus } {
  const [status, setStatus] = useState<HealthStatus>(
    serverUrl ? 'checking' : 'unconfigured'
  )

  useEffect(() => {
    if (!serverUrl) {
      setStatus('unconfigured')
      return
    }

    setStatus('checking')
    let cancelled = false

    const check = async () => {
      try {
        const base = serverUrl.replace(/\/+$/, '')
        const res = await fetch(`${base}/__health`, {
          mode: 'cors',
          signal: AbortSignal.timeout(5000),
        })
        if (!cancelled) {
          setStatus(res.ok ? 'online' : 'offline')
        }
      } catch {
        if (!cancelled) {
          setStatus('offline')
        }
      }
    }

    check()
    return () => { cancelled = true }
  }, [serverUrl])

  return { status }
}
