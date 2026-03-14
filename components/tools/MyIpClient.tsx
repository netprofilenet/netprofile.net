'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { fetchIpInfo, type IpInfo } from '@/lib/orchestrator'

// Convert 2-letter country code to flag emoji
function countryFlag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map(c => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('')
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null
  return (
    <div className="flex items-baseline justify-between py-3 border-b border-neutral-100 last:border-0">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="text-sm font-medium text-neutral-700 text-right">{value}</span>
    </div>
  )
}

export default function MyIpClient() {
  const [info, setInfo] = useState<IpInfo | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIpInfo()
      .then(setInfo)
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
            <div className="h-5 w-20 bg-neutral-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !info) {
    return (
      <div className="border border-red-200 bg-red-50 rounded-lg p-6 text-sm text-red-700">
        Could not determine your IP address. Check your connection and try again.
      </div>
    )
  }

  const location = [info.city, info.region, info.country].filter(Boolean).join(', ')

  return (
    <div className="space-y-8 animate-fade-up">
      {/* IP Hero */}
      <div className="relative bg-neutral-950 rounded-2xl p-8 md:p-12 overflow-hidden noise-bg">
        <div className="relative flex flex-col items-center gap-4 text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
            Your IP Address
          </span>
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-white tracking-tight break-all">
            {info.ip}
          </h2>
          <span className={`inline-block text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded-full ${
            info.ipVersion === 6
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
          }`}>
            IPv{info.ipVersion}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Location */}
        <div className="border border-neutral-200 rounded-xl p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Location</h3>
          {info.country && (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{countryFlag(info.country)}</span>
              <span className="text-lg font-medium">{location}</span>
            </div>
          )}
          <div>
            <InfoRow label="Country" value={info.countryName || info.country} />
            <InfoRow label="Region" value={info.region} />
            <InfoRow label="City" value={info.city} />
            <InfoRow label="Postal Code" value={info.postalCode} />
            <InfoRow label="Timezone" value={info.timezone} />
            <InfoRow label="Continent" value={info.continent} />
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
            {info.latitude != null && info.longitude != null && (
              <InfoRow
                label="Coordinates"
                value={`${info.latitude.toFixed(4)}, ${info.longitude.toFixed(4)}`}
              />
            )}
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
