'use client'

import { useEffect, useState } from 'react'
import { getDefaultServerUrl } from '@/lib/config'
import { useServerHealth } from '@/lib/useServerHealth'
import { isOrchestratorEnabled, fetchServers } from '@/lib/orchestrator'
import type { ServerInfo } from '@/lib/qoe'

interface Props {
  value: string
  onChange: (url: string) => void
  onServerSelect?: (server: ServerInfo | null) => void
}

export default function ServerSelector({ value, onChange, onServerSelect }: Props) {
  const { status } = useServerHealth(value || null)
  const [servers, setServers] = useState<ServerInfo[]>([])
  const [loadingServers, setLoadingServers] = useState(false)
  const orchestratorEnabled = isOrchestratorEnabled()

  // Load servers from orchestrator on mount
  useEffect(() => {
    if (!orchestratorEnabled) {
      const defaultUrl = getDefaultServerUrl()
      if (defaultUrl && !value) {
        onChange(defaultUrl)
      }
      return
    }

    setLoadingServers(true)
    fetchServers()
      .then(s => {
        setServers(s)
        if (s.length > 0 && !value) {
          onChange(s[0].httpUrl)
          onServerSelect?.(s[0])
        }
      })
      .catch(() => setServers([]))
      .finally(() => setLoadingServers(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const dot =
    status === 'online' ? 'bg-green-500' :
    status === 'offline' ? 'bg-red-500' :
    status === 'checking' ? 'bg-yellow-400 animate-pulse' :
    'bg-gray-300'

  const statusLabel =
    status === 'online' ? 'Connected' :
    status === 'offline' ? 'Unreachable' :
    status === 'checking' ? 'Checking...' :
    'No server'

  // Orchestrator mode: dropdown of discovered servers
  if (orchestratorEnabled) {
    const selected = servers.find(s => s.httpUrl === value)
    const hostOrg = (selected as Record<string, unknown> | undefined)?.hostOrg as string | undefined
    const hostUrl = (selected as Record<string, unknown> | undefined)?.hostUrl as string | undefined

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 whitespace-nowrap">Server:</label>
          {loadingServers ? (
            <span className="text-sm text-gray-400">Loading servers...</span>
          ) : servers.length > 0 ? (
            <select
              value={value}
              onChange={e => {
                const url = e.target.value
                onChange(url)
                const server = servers.find(s => s.httpUrl === url) || null
                onServerSelect?.(server)
              }}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm flex-1 max-w-sm focus:outline-none focus:border-gray-500"
            >
              {servers.map(s => (
                <option key={s.id} value={s.httpUrl}>
                  {s.name}{s.country ? ` (${s.country})` : ''}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-sm text-gray-400">No servers available</span>
          )}
          <div className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${dot}`} />
            <span className="text-xs text-gray-500">{statusLabel}</span>
          </div>
        </div>
        {hostOrg && (
          <p className="text-xs text-gray-400">
            Hosted by{' '}
            {hostUrl ? (
              <a href={hostUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600 transition-colors">
                {hostOrg}
              </a>
            ) : (
              hostOrg
            )}
          </p>
        )}
      </div>
    )
  }

  // Standalone mode: manual URL input
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600 whitespace-nowrap">Server:</label>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="http://localhost:3000"
          className="border border-gray-300 rounded px-3 py-1.5 text-sm flex-1 max-w-sm focus:outline-none focus:border-gray-500"
        />
        <div className="flex items-center gap-1.5">
          <span className={`inline-block w-2 h-2 rounded-full ${dot}`} />
          <span className="text-xs text-gray-500">{statusLabel}</span>
        </div>
      </div>

      {status === 'unconfigured' && (
        <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
          <p className="mb-2">No test server configured. Self-host one with Docker:</p>
          <pre className="bg-gray-100 rounded px-3 py-2 text-xs font-mono overflow-x-auto">
            docker run -p 3000:3000 ghcr.io/netprofile/qoe:latest
          </pre>
          <p className="mt-2">
            Then enter <code className="text-xs bg-gray-100 px-1 rounded">http://localhost:3000</code> above.
          </p>
        </div>
      )}
    </div>
  )
}
