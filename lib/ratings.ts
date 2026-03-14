import type { TestResult } from './orchestrator'

export type Rating = 'excellent' | 'good' | 'fair' | 'poor'

export function getLatencyRating(ms: number): Rating {
  if (ms <= 20) return 'excellent'
  if (ms <= 50) return 'good'
  if (ms <= 100) return 'fair'
  return 'poor'
}

export function getBandwidthRating(mbps: number): Rating {
  if (mbps >= 100) return 'excellent'
  if (mbps >= 25) return 'good'
  if (mbps >= 5) return 'fair'
  return 'poor'
}

export function getPacketLossRating(pct: number): Rating {
  if (pct === 0) return 'excellent'
  if (pct <= 0.5) return 'good'
  if (pct <= 2) return 'fair'
  return 'poor'
}

export function getBufferbloatRating(ms: number): Rating {
  if (ms <= 5) return 'excellent'
  if (ms <= 30) return 'good'
  if (ms <= 100) return 'fair'
  return 'poor'
}

export function getQualityScoreRating(score: number): Rating {
  if (score >= 80) return 'excellent'
  if (score >= 60) return 'good'
  if (score >= 40) return 'fair'
  return 'poor'
}

export interface ApplicationVerdicts {
  videoCalls: Rating
  gaming: Rating
  streaming: Rating
}

export function getApplicationVerdicts(result: TestResult): ApplicationVerdicts {
  const latency = result.idleLatencyMs ?? 999
  const loss = result.packetLossPct ?? 100
  const download = result.downloadMbps ?? 0

  // Video Calls: needs low latency + low packet loss
  let videoCalls: Rating
  if (latency <= 50 && loss <= 0.5) videoCalls = 'excellent'
  else if (latency <= 100 && loss <= 1) videoCalls = 'good'
  else if (latency <= 200 && loss <= 3) videoCalls = 'fair'
  else videoCalls = 'poor'

  // Gaming: needs very low latency + low packet loss
  let gaming: Rating
  if (latency <= 20 && loss <= 0.1) gaming = 'excellent'
  else if (latency <= 50 && loss <= 0.5) gaming = 'good'
  else if (latency <= 100 && loss <= 2) gaming = 'fair'
  else gaming = 'poor'

  // Streaming: needs sufficient download bandwidth
  let streaming: Rating
  if (download >= 50) streaming = 'excellent'
  else if (download >= 15) streaming = 'good'
  else if (download >= 5) streaming = 'fair'
  else streaming = 'poor'

  return { videoCalls, gaming, streaming }
}

export const ratingColor: Record<Rating, string> = {
  excellent: 'text-emerald-600',
  good: 'text-blue-600',
  fair: 'text-amber-600',
  poor: 'text-red-600',
}

export const ratingBg: Record<Rating, string> = {
  excellent: 'bg-emerald-50 border-emerald-200',
  good: 'bg-blue-50 border-blue-200',
  fair: 'bg-amber-50 border-amber-200',
  poor: 'bg-red-50 border-red-200',
}

export const ratingLabel: Record<Rating, string> = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  poor: 'Poor',
}
