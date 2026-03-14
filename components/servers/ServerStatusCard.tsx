interface Props {
  name: string
  country: string
  city?: string
  online: boolean
  hostOrg?: string
  hostUrl?: string
  uptimePct: number | null
  lastHeartbeat: string | null
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const seconds = Math.floor(diff / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function ServerStatusCard({
  name, country, city, online, hostOrg, hostUrl, uptimePct, lastHeartbeat,
}: Props) {
  return (
    <div className="border border-neutral-200 rounded-lg p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className={`inline-block w-2 h-2 rounded-full ${online ? 'bg-green-500' : 'bg-red-400'}`} />
            <h3 className="font-medium">{name}</h3>
          </div>
          <p className="text-sm text-neutral-500 mt-0.5">
            {city ? `${city}, ${country}` : country}
          </p>
        </div>
        {uptimePct !== null && (
          <span className="text-xs text-neutral-400 tabular-nums">
            {uptimePct.toFixed(1)}% uptime
          </span>
        )}
      </div>

      {/* Uptime bar */}
      {uptimePct !== null && (
        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden mb-3">
          <div
            className={`h-full rounded-full ${uptimePct >= 99 ? 'bg-green-500' : uptimePct >= 90 ? 'bg-yellow-400' : 'bg-red-400'}`}
            style={{ width: `${Math.min(uptimePct, 100)}%` }}
          />
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-neutral-400">
        {hostOrg ? (
          hostUrl ? (
            <a href={hostUrl} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-600 transition-colors">
              Hosted by {hostOrg}
            </a>
          ) : (
            <span>Hosted by {hostOrg}</span>
          )
        ) : (
          <span />
        )}
        {lastHeartbeat && (
          <span>Last seen {relativeTime(lastHeartbeat)}</span>
        )}
      </div>
    </div>
  )
}
