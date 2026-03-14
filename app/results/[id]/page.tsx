import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchResult } from '@/lib/orchestrator'
import { notFound } from 'next/navigation'
import MetricCard from '@/components/ui/MetricCard'
import ServerAttribution from '@/components/ui/ServerAttribution'

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const result = await fetchResult(id)
  if (!result) {
    return { title: 'Result Not Found — netprofile' }
  }

  const parts: string[] = []
  if (result.downloadMbps != null) parts.push(`${result.downloadMbps.toFixed(1)} Mbps down`)
  if (result.uploadMbps != null) parts.push(`${result.uploadMbps.toFixed(1)} Mbps up`)
  if (result.idleLatencyMs != null) parts.push(`${result.idleLatencyMs.toFixed(0)} ms latency`)

  const title = parts.length > 0
    ? `${parts.join(' / ')} — netprofile`
    : `Test Result — netprofile`

  const description = `Network quality test result: ${parts.join(', ')}`
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function ResultPage({ params }: Props) {
  const { id } = await params
  const result = await fetchResult(id)

  if (!result) {
    notFound()
  }

  const date = new Date(result.createdAt)

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl mb-2">Test Result</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
          <span className="inline-block bg-neutral-100 rounded px-2 py-0.5 text-xs font-medium uppercase">
            {result.testMode}
          </span>
          <time dateTime={result.createdAt}>
            {date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            {' '}
            {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </time>
          <span className="text-neutral-300">|</span>
          <span className="font-mono text-xs text-neutral-400">{result.id}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {result.downloadMbps != null && (
          <MetricCard label="Download" value={result.downloadMbps.toFixed(1)} unit="Mbps" />
        )}
        {result.uploadMbps != null && (
          <MetricCard label="Upload" value={result.uploadMbps.toFixed(1)} unit="Mbps" />
        )}
        {result.idleLatencyMs != null && (
          <MetricCard label="Latency" value={result.idleLatencyMs.toFixed(0)} unit="ms" />
        )}
        {result.bufferbloatMs != null && (
          <MetricCard label="Bufferbloat" value={result.bufferbloatMs.toFixed(0)} unit="ms" />
        )}
        {result.packetLossPct != null && (
          <MetricCard label="Packet Loss" value={result.packetLossPct.toFixed(2)} unit="%" />
        )}
        {result.qualityScore != null && (
          <MetricCard label="Quality Score" value={result.qualityScore.toFixed(0)} unit="/100" />
        )}
      </div>

      {/* Server attribution */}
      {(result.serverName || result.serverCity || result.serverCountry) && (
        <div className="mb-8">
          <ServerAttribution
            serverName={result.serverName}
            serverId={result.serverId}
            serverCity={result.serverCity}
            serverCountry={result.serverCountry}
            hostOrg={result.hostOrg}
            hostUrl={result.hostUrl}
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
        <Link
          href={`/profile/${result.id}`}
          className="inline-block border border-neutral-200 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-neutral-400 transition-colors"
        >
          View your Network Profile
        </Link>
        <Link
          href="/speedtest"
          className="inline-block bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Run your own test
        </Link>
      </div>
    </div>
  )
}
