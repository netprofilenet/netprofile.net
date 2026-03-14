import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Host a Server — netprofile',
  description: 'Run a netprofile test server and help expand global network quality coverage.',
}

import CopyBlock from '@/components/ui/CopyBlock'

export default function HostPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Host a test server</h1>
        <p className="text-neutral-500 text-lg max-w-2xl">
          Help build a global network of test servers. One Docker command, full attribution,
          zero cost to you beyond the server.
        </p>
      </div>

      {/* Why Host */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl mb-6">Why host?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-neutral-200 rounded-lg p-5">
            <h3 className="font-medium mb-2">Expand coverage</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              More servers in more locations means better testing for everyone.
              Your server helps users measure real-world performance to your region.
            </p>
          </div>
          <div className="border border-neutral-200 rounded-lg p-5">
            <h3 className="font-medium mb-2">Get attribution</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Your organization name and link appear in the test UI, server status page,
              and test results. Visible to every user who tests against your server.
            </p>
          </div>
          <div className="border border-neutral-200 rounded-lg p-5">
            <h3 className="font-medium mb-2">Easy Docker setup</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Single container, no dependencies. Pull the image, set a few env vars,
              and you're live. Updates are just a container restart.
            </p>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl mb-6">Requirements</h2>
        <ul className="space-y-3 text-neutral-600">
          <li className="flex items-start gap-3">
            <span className="text-neutral-300 mt-0.5">&#x2022;</span>
            <span>Linux VPS or dedicated server with a public IP</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-300 mt-0.5">&#x2022;</span>
            <span>100 Mbps or faster network connection (1 Gbps recommended)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-300 mt-0.5">&#x2022;</span>
            <span>Docker installed</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-300 mt-0.5">&#x2022;</span>
            <span>Port 3000 (or your chosen port) accessible from the internet</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-300 mt-0.5">&#x2022;</span>
            <span>Reasonable uptime — occasional maintenance is fine</span>
          </li>
        </ul>
      </section>

      {/* Setup */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl mb-6">Setup</h2>
        <p className="text-neutral-500 mb-4">
          Once you have an API key, start the server with Docker:
        </p>
        <CopyBlock text={`docker run -d \\
  --name qoe-server \\
  --restart unless-stopped \\
  -p 3000:3000 \\
  -e SERVER_ID=your-server-id \\
  -e SERVER_LOCATION="City, Country" \\
  -e SERVER_COUNTRY=US \\
  -e SERVER_CITY="New York" \\
  -e HOST_ORG="Your Organization" \\
  -e SERVER_PUBLIC_URL="https://your-server.example.com" \\
  -e REGISTER_URL=https://orch.netprofile.net \\
  -e REGISTER_API_KEY=np_your-api-key \\
  ghcr.io/netprofile/qoe:latest`} />
        <p className="text-sm text-neutral-400 mt-3">
          The server registers itself with the orchestrator, starts sending heartbeats,
          and appears on the public server list automatically.
        </p>
      </section>

      {/* Get Started */}
      <section className="mb-16">
        <h2 className="font-serif text-2xl mb-6">Get started</h2>
        <p className="text-neutral-500 mb-4">
          To request an API key and server ID, open an issue on GitHub. Include:
        </p>
        <ul className="space-y-2 text-neutral-600 mb-6">
          <li className="flex items-start gap-3">
            <span className="text-neutral-300 mt-0.5">&#x2022;</span>
            <span>Your organization name</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-300 mt-0.5">&#x2022;</span>
            <span>Server location (city + country)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neutral-300 mt-0.5">&#x2022;</span>
            <span>Server specs (bandwidth, provider)</span>
          </li>
        </ul>
        <a
          href="https://github.com/netprofilenet/qoe-go-server/issues/new?title=Host+request&labels=host-request"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Request an API key
        </a>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="font-serif text-2xl mb-6">FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-1">How much bandwidth will it use?</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Each test transfers 10-100 MB depending on mode. Typical servers see a few GB per day.
              Bandwidth is only used during active tests — there's no idle overhead beyond heartbeats.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">What data is collected?</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Test results (bandwidth, latency, packet loss) are stored with the server ID and a hashed client IP.
              No personal data is collected. The server itself doesn't log anything beyond standard access logs.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">What are the uptime requirements?</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              There's no strict SLA. If your server goes offline, it's automatically removed from the
              active server list and reappears when it comes back. Planned maintenance is fine.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Can I run it behind a reverse proxy?</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Yes. Set <code className="bg-neutral-100 px-1 rounded text-xs">SERVER_PUBLIC_URL</code> to
              your public HTTPS URL. The server needs WebSocket support for WebRTC signaling.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
