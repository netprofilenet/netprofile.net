import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchResult } from '@/lib/orchestrator'
import { notFound } from 'next/navigation'
import {
  getLatencyRating,
  getBandwidthRating,
  getPacketLossRating,
  getBufferbloatRating,
  getQualityScoreRating,
  getApplicationVerdicts,
  ratingColor,
  ratingLabel,
  type Rating,
} from '@/lib/ratings'
import MetricCard from '@/components/ui/MetricCard'
import ServerAttribution from '@/components/ui/ServerAttribution'
import CopyLinkButton from './CopyLinkButton'

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const result = await fetchResult(id)
  if (!result) {
    return { title: 'Profile Not Found — netprofile' }
  }

  const parts: string[] = []
  if (result.downloadMbps != null) parts.push(`${result.downloadMbps.toFixed(1)} Mbps down`)
  if (result.uploadMbps != null) parts.push(`${result.uploadMbps.toFixed(1)} up`)
  if (result.idleLatencyMs != null) parts.push(`${result.idleLatencyMs.toFixed(0)}ms`)

  const summary = parts.join(' / ')
  const title = summary ? `${summary} — Network Profile` : 'Network Profile — netprofile'
  const description = `Network quality profile: ${summary}. Test your own connection at netprofile.net`

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: 'summary_large_image', title, description },
  }
}

function VerdictRow({ label, icon, rating }: { label: string; icon: string; rating: Rating }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-100 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className={`text-sm font-medium ${ratingColor[rating]}`}>
        {ratingLabel[rating]}
      </span>
    </div>
  )
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params
  const result = await fetchResult(id)

  if (!result) {
    notFound()
  }

  const date = new Date(result.createdAt)

  // Only show application verdicts when we have enough data to be meaningful
  const hasVerdictData = result.idleLatencyMs != null || result.downloadMbps != null
  const verdicts = hasVerdictData ? getApplicationVerdicts(result) : null

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="font-serif text-3xl md:text-4xl">Your Network Profile</h1>
        </div>
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

      {/* Speed Section */}
      <section className="mb-8 animate-fade-up" style={{ animationDelay: '0.05s' }}>
        <h2 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Speed</h2>
        <div className="grid grid-cols-2 gap-4">
          {result.downloadMbps != null && (
            <MetricCard
              label="Download"
              value={result.downloadMbps.toFixed(1)}
              unit="Mbps"
              rating={getBandwidthRating(result.downloadMbps)}
            />
          )}
          {result.uploadMbps != null && (
            <MetricCard
              label="Upload"
              value={result.uploadMbps.toFixed(1)}
              unit="Mbps"
              rating={getBandwidthRating(result.uploadMbps)}
            />
          )}
        </div>
      </section>

      {/* Quality Section */}
      <section className="mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Quality</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {result.idleLatencyMs != null && (
            <MetricCard
              label="Latency"
              value={result.idleLatencyMs.toFixed(0)}
              unit="ms"
              rating={getLatencyRating(result.idleLatencyMs)}
            />
          )}
          {result.bufferbloatMs != null && (
            <MetricCard
              label="Bufferbloat"
              value={result.bufferbloatMs.toFixed(0)}
              unit="ms"
              rating={getBufferbloatRating(result.bufferbloatMs)}
            />
          )}
          {result.packetLossPct != null && (
            <MetricCard
              label="Packet Loss"
              value={result.packetLossPct.toFixed(2)}
              unit="%"
              rating={getPacketLossRating(result.packetLossPct)}
            />
          )}
          {result.qualityScore != null && (
            <MetricCard
              label="Quality Score"
              value={result.qualityScore.toFixed(0)}
              unit="/100"
              rating={getQualityScoreRating(result.qualityScore)}
            />
          )}
        </div>
      </section>

      {/* Application Readiness — only shown when we have meaningful data */}
      {verdicts && (
        <section className="mb-8 animate-fade-up" style={{ animationDelay: '0.15s' }}>
          <h2 className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-4">Application Readiness</h2>
          <div className="border border-neutral-200 rounded-xl p-5">
            <VerdictRow label="Video Calls" icon={'\u{1F3A5}'} rating={verdicts.videoCalls} />
            <VerdictRow label="Gaming" icon={'\u{1F3AE}'} rating={verdicts.gaming} />
            <VerdictRow label="Streaming" icon={'\u{1F3AC}'} rating={verdicts.streaming} />
          </div>
        </section>
      )}

      {/* Server Info */}
      {(result.serverName || result.serverCity || result.serverCountry) && (
        <section className="mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <ServerAttribution
            serverName={result.serverName}
            serverId={result.serverId}
            serverCity={result.serverCity}
            serverCountry={result.serverCountry}
            hostOrg={result.hostOrg}
            hostUrl={result.hostUrl}
          />
        </section>
      )}

      {/* Share + CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center pt-4 border-t border-neutral-100 animate-fade-up" style={{ animationDelay: '0.25s' }}>
        <CopyLinkButton />
        <Link
          href="/speedtest"
          className="inline-block bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Test your own connection
        </Link>
      </div>
    </div>
  )
}
