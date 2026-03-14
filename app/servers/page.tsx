'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { isOrchestratorEnabled, fetchServerStatus } from '@/lib/orchestrator'
import type { ServerStatusInfo } from '@/lib/orchestrator'
import ServerStatusCard from '@/components/servers/ServerStatusCard'

export default function ServersPage() {
  const [servers, setServers] = useState<ServerStatusInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const orchestratorEnabled = isOrchestratorEnabled()

  useEffect(() => {
    if (!orchestratorEnabled) {
      setLoading(false)
      return
    }

    let mounted = true
    const load = () => {
      fetchServerStatus()
        .then(s => { if (mounted) setServers(s) })
        .catch(err => { if (mounted) setError(err.message) })
        .finally(() => { if (mounted) setLoading(false) })
    }

    load()
    const interval = setInterval(load, 30_000)
    return () => { mounted = false; clearInterval(interval) }
  }, [orchestratorEnabled])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl mb-2">Server Status</h1>
        <p className="text-neutral-500 text-sm">
          Live status of all test servers in the netprofile network.
        </p>
      </div>

      {loading && (
        <div className="grid md:grid-cols-2 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="border border-neutral-200 rounded-lg p-5 animate-pulse">
              <div className="h-4 bg-neutral-100 rounded w-1/2 mb-3" />
              <div className="h-3 bg-neutral-100 rounded w-1/3 mb-3" />
              <div className="h-1.5 bg-neutral-100 rounded-full" />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="border border-red-200 bg-red-50 rounded-lg p-4 text-sm text-red-700">
          Failed to load server status: {error}
        </div>
      )}

      {!loading && !error && !orchestratorEnabled && (
        <div className="text-center py-16 text-neutral-400">
          <p className="mb-4">Orchestrator not configured.</p>
        </div>
      )}

      {!loading && !error && orchestratorEnabled && servers.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-400 mb-4">No servers registered yet.</p>
          <Link
            href="/host"
            className="inline-block bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
          >
            Host a server
          </Link>
        </div>
      )}

      {!loading && !error && servers.length > 0 && (
        <>
          <div className="flex items-center gap-4 mb-6 text-sm text-neutral-500">
            <span>{servers.filter(s => s.online).length} online</span>
            <span className="text-neutral-200">|</span>
            <span>{servers.length} total</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {servers.map(s => (
              <ServerStatusCard
                key={s.id}
                name={s.name}
                country={s.country}
                city={s.city}
                online={s.online}
                hostOrg={s.hostOrg}
                hostUrl={s.hostUrl}
                uptimePct={s.uptimePct}
                lastHeartbeat={s.lastHeartbeat}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
