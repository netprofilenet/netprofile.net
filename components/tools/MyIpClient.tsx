'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchDualStackIpInfo, type DualStackIpInfo } from '@/lib/orchestrator'

function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map(c => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex items-baseline justify-between py-2.5 border-b border-neutral-100 last:border-0">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="text-sm font-medium text-neutral-700 text-right">{value}</span>
    </div>
  )
}

function IpBadge({ ip, version, label }: { ip: string; version: 4 | 6; label?: string }) {
  const colors = version === 6
    ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
    : 'bg-blue-500/10 text-blue-600 border-blue-500/20'

  return (
    <div className={`border rounded-xl p-5 ${colors}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium uppercase tracking-wider opacity-70">
          {label || `IPv${version}`}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors}`}>
          IPv{version}
        </span>
      </div>
      <p className="font-mono text-lg md:text-xl font-semibold break-all leading-tight">
        {ip}
      </p>
    </div>
  )
}

export default function MyIpClient() {
  const [data, setData] = useState<DualStackIpInfo | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDualStackIpInfo()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="animate-fade-up">
        <div className="bg-neutral-50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col items-center gap-6">
            <div className="h-5 w-32 bg-neutral-200 rounded animate-pulse" />
            <div className="h-12 w-72 bg-neutral-200 rounded animate-pulse" />
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
              <div className="h-20 bg-neutral-200 rounded-xl animate-pulse" />
              <div className="h-20 bg-neutral-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="border border-red-200 bg-red-50 rounded-lg p-6 text-sm text-red-700">
        Could not determine your IP address. Check your connection and try again.
      </div>
    )
  }

  const { primary: info, ipv4, ipv6 } = data
  const location = [info.city, info.region, info.country].filter(Boolean).join(', ')

  // Determine which IPs to show
  const hasIPv4 = ipv4 != null
  const hasIPv6 = ipv6 != null
  const isDualStack = hasIPv4 && hasIPv6

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Primary IP Hero */}
      <div className="relative bg-neutral-950 rounded-2xl p-8 md:p-12 overflow-hidden noise-bg">
        <div className="relative flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
            Your IP Address
          </span>
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-white tracking-tight break-all">
            {info.ip}
          </h2>
          <div className="flex items-center gap-2">
            <span className={`inline-block text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full ${
              info.ipVersion === 6
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
            }`}>
              IPv{info.ipVersion}
            </span>
            {isDualStack && (
              <span className="inline-block text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Dual-Stack
              </span>
            )}
          </div>
        </div>
      </div>

      {/* IPv4 / IPv6 Side-by-Side */}
      {(hasIPv4 || hasIPv6) && (
        <div className={`grid gap-4 ${isDualStack ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {hasIPv4 && <IpBadge ip={ipv4!} version={4} label="IPv4 Address" />}
          {hasIPv6 && <IpBadge ip={ipv6!} version={6} label="IPv6 Address" />}
        </div>
      )}

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Location */}
        <div className="border border-neutral-200 rounded-xl p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Location</h3>
          {info.country && (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{countryFlag(info.country)}</span>
              <div>
                <span className="text-lg font-medium">{location}</span>
                {info.isEU && (
                  <span className="ml-2 text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-200">
                    EU
                  </span>
                )}
              </div>
            </div>
          )}
          <div>
            <InfoRow label="Country" value={info.countryName || info.country} />
            <InfoRow label="Region" value={info.region} />
            <InfoRow label="Region Code" value={info.regionCode} />
            <InfoRow label="City" value={info.city} />
            <InfoRow label="Postal Code" value={info.postalCode} />
            <InfoRow label="Timezone" value={info.timezone} />
            <InfoRow label="Continent" value={info.continent} />
            {info.latitude != null && info.longitude != null && (
              <InfoRow
                label="Coordinates"
                value={`${info.latitude.toFixed(4)}, ${info.longitude.toFixed(4)}`}
              />
            )}
            <InfoRow label="Metro Code" value={info.metroCode} />
          </div>
        </div>

        {/* Network */}
        <div className="border border-neutral-200 rounded-xl p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Network</h3>
          {info.asOrganization && (
            <div className="mb-4">
              <span className="text-lg font-medium">{info.asOrganization}</span>
            </div>
          )}
          <div>
            <InfoRow label="ISP" value={info.asOrganization} />
            <InfoRow label="ASN" value={info.asn != null ? `AS${info.asn}` : null} />
            <InfoRow label="IP Version" value={`IPv${info.ipVersion}`} />
            <InfoRow label="Dual-Stack" value={isDualStack ? 'Yes (IPv4 + IPv6)' : hasIPv4 ? 'IPv4 only' : 'IPv6 only'} />
          </div>
        </div>
      </div>

      {/* Connection Details */}
      <div className="border border-neutral-200 rounded-xl p-6">
        <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Connection</h3>
        <div className="grid md:grid-cols-2 gap-x-8">
          <div>
            <InfoRow label="HTTP Protocol" value={info.httpProtocol} />
            <InfoRow label="TLS Version" value={info.tlsVersion} />
            <InfoRow label="TLS Cipher" value={info.tlsCipher} />
          </div>
          <div>
            <InfoRow label="TCP Round-Trip" value={info.clientTcpRtt != null ? `${info.clientTcpRtt} ms` : null} />
            <InfoRow label="Cloudflare Colo" value={info.colo} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <p className="text-sm text-neutral-400 mb-4">
          Want to know how fast your connection actually is?
        </p>
        <Link
          href="/speedtest"
          className="inline-block bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Test your network speed
        </Link>
      </div>
    </div>
  )
}
