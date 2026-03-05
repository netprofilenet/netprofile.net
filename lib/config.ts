import type { ServerInfo } from '@netprofile/qoe-js'

/**
 * Returns the configured test server URL, or null if not set.
 */
export function getDefaultServerUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_QOE_SERVER_URL
  return url && url.trim() ? url.trim() : null
}

/**
 * Builds a full ServerInfo object from a plain HTTP URL.
 * Derives the WebSocket signaling URL and adds default STUN servers.
 */
export function makeServerInfo(httpUrl: string): ServerInfo {
  // Derive WebSocket URL: http→ws, https→wss, append /signaling
  const base = httpUrl.replace(/\/+$/, '')
  const wsUrl = base.replace(/^http/, 'ws') + '/signaling'

  return {
    id: 'custom',
    name: 'Custom Server',
    country: '',
    httpUrl: base,
    webrtcSignalingUrl: wsUrl,
    stunServers: ['stun:stun.l.google.com:19302'],
    turnServers: [],
    enabled: true,
  }
}
