'use client'

import Link from 'next/link'

export default function QuickTest() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-44 h-44 rounded-full border-2 border-dashed border-neutral-300">
        <div>
          <div className="text-lg font-medium text-neutral-400">Coming Soon</div>
          <div className="text-xs text-neutral-400 mt-0.5">Public test servers</div>
        </div>
      </div>

      <p className="mt-8 text-sm text-neutral-500 max-w-md mx-auto">
        We&apos;re setting up public test servers. In the meantime, you can self-host
        your own and test from the{' '}
        <Link href="/speedtest" className="text-neutral-900 underline underline-offset-2 hover:no-underline">
          full test page
        </Link>.
      </p>

      <pre className="inline-block text-left bg-neutral-950 text-neutral-300 rounded-lg px-5 py-3 text-sm font-mono mt-6">
        docker run -p 3000:3000 ghcr.io/netprofile/qoe:latest
      </pre>
    </div>
  )
}
