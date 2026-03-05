'use client'

import { useEffect } from 'react'
import { getDefaultServerUrl } from '@/lib/config'
import { useServerHealth } from '@/lib/useServerHealth'

interface Props {
  value: string
  onChange: (url: string) => void
}

export default function ServerSelector({ value, onChange }: Props) {
  const { status } = useServerHealth(value || null)

  // Initialize with default server URL on mount
  useEffect(() => {
    const defaultUrl = getDefaultServerUrl()
    if (defaultUrl && !value) {
      onChange(defaultUrl)
    }
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
