import type { ServerInfo } from '@netprofile/qoe-js'

const ORCHESTRATOR_URL = process.env.NEXT_PUBLIC_ORCHESTRATOR_URL?.replace(/\/+$/, '') || ''

export function isOrchestratorEnabled(): boolean {
  return ORCHESTRATOR_URL !== ''
}

export async function fetchServers(): Promise<ServerInfo[]> {
  const res = await fetch(`${ORCHESTRATOR_URL}/api/servers`, {
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(`Failed to fetch servers: ${res.status}`)
  const data = await res.json()
  return data.servers
}

export async function fetchTestToken(serverId: string): Promise<{ token: string; expiresAt: number }> {
  const res = await fetch(`${ORCHESTRATOR_URL}/api/test-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ serverId }),
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(`Failed to fetch test token: ${res.status}`)
  return res.json()
}

export interface SubmitResultPayload {
  serverId: string
  testMode: string
  downloadBandwidth?: number
  uploadBandwidth?: number
  idleLatency?: number
  downloadLatency?: number
  uploadLatency?: number
  packetLoss?: number
  qualityScore?: number
  connectionType?: string
  rawResults?: unknown
}

export async function submitResult(result: SubmitResultPayload): Promise<{ id: string }> {
  const res = await fetch(`${ORCHESTRATOR_URL}/api/results`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
    signal: AbortSignal.timeout(10000),
  })
  if (!res.ok) throw new Error(`Failed to submit result: ${res.status}`)
  return res.json()
}

export interface ServerStatusInfo {
  id: string
  name: string
  country: string
  city?: string
  hostOrg?: string
  hostUrl?: string
  online: boolean
  enabled: boolean
  uptimePct: number | null
  lastHeartbeat: string | null
  createdAt: string
}

export async function fetchServerStatus(): Promise<ServerStatusInfo[]> {
  const res = await fetch(`${ORCHESTRATOR_URL}/api/servers/status`, {
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(`Failed to fetch server status: ${res.status}`)
  const data = await res.json()
  return data.servers
}

export interface TestResult {
  id: string
  serverId: string
  testMode: string
  downloadMbps: number | null
  uploadMbps: number | null
  idleLatencyMs: number | null
  loadedLatencyMs: number | null
  packetLossPct: number | null
  bufferbloatMs: number | null
  qualityScore: number | null
  connectionType: string | null
  createdAt: string
  serverName?: string
  serverCity?: string
  serverCountry?: string
  hostOrg?: string
  hostUrl?: string
}

export async function fetchResult(id: string): Promise<TestResult | null> {
  const res = await fetch(`${ORCHESTRATOR_URL}/api/results/${id}`, {
    signal: AbortSignal.timeout(5000),
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Failed to fetch result: ${res.status}`)
  return res.json()
}

export interface IpInfo {
  ip: string
  ipVersion: number
  country: string | null
  countryName: string | null
  region: string | null
  city: string | null
  postalCode: string | null
  latitude: number | null
  longitude: number | null
  timezone: string | null
  asn: number | null
  asOrganization: string | null
  continent: string | null
}

export async function fetchIpInfo(): Promise<IpInfo> {
  const res = await fetch(`${ORCHESTRATOR_URL}/api/ip-info`, {
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) throw new Error(`Failed to fetch IP info: ${res.status}`)
  return res.json()
}

export interface RateLimitStatus {
  allowed: boolean
  remaining: number
  resetAt?: number
}

export async function checkRateLimit(): Promise<RateLimitStatus> {
  try {
    // The test-token endpoint returns rate limit headers
    // We do a preflight-style check by just hitting servers (lightweight)
    const res = await fetch(`${ORCHESTRATOR_URL}/api/servers`, {
      signal: AbortSignal.timeout(5000),
    })
    const remaining = parseInt(res.headers.get('X-RateLimit-Remaining') ?? '5', 10)
    const resetAt = parseInt(res.headers.get('X-RateLimit-Reset') ?? '0', 10)
    return { allowed: remaining > 0, remaining, resetAt: resetAt || undefined }
  } catch {
    return { allowed: true, remaining: -1 }
  }
}
