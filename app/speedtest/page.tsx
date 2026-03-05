import type { Metadata } from 'next'
import SpeedtestWidget from '@/components/speedtest/SpeedtestWidget'

export const metadata: Metadata = {
  title: 'Network Test — netprofile',
  description: 'Run a detailed network quality test with real-time charts, mode selection, and custom server support.',
}

export default function SpeedTestPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="font-serif text-3xl md:text-4xl mb-2">Network Test</h1>
        <p className="text-neutral-500 text-sm">
          Detailed test with real-time charts. Choose a mode, point at a server, and go.
        </p>
      </div>

      <div className="border border-amber-200 bg-amber-50 rounded-lg px-4 py-3 text-sm text-amber-800 mb-8">
        Public test servers are not available yet. Enter your own server URL below to run a test.
        Self-host with: <code className="bg-amber-100 rounded px-1.5 py-0.5 text-xs">docker run -p 3000:3000 ghcr.io/netprofile/qoe:latest</code>
      </div>

      <SpeedtestWidget />
    </div>
  )
}
