import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Network Tools — netprofile',
  description:
    'Free network diagnostic tools. Check your IP address, test your speed, and more. Open-source, no tracking.',
}

interface Tool {
  name: string
  description: string
  href: string
  available: boolean
}

const tools: Tool[] = [
  {
    name: 'What Is My IP',
    description: 'See your public IP address, location, ISP, and network details.',
    href: '/tools/my-ip',
    available: true,
  },
  {
    name: 'Speed Test',
    description: 'Measure download, upload, latency, bufferbloat, and packet loss.',
    href: '/speedtest',
    available: true,
  },
  {
    name: 'DNS Lookup',
    description: 'Query DNS records for any domain.',
    href: '/tools/dns',
    available: false,
  },
  {
    name: 'Ping',
    description: 'Test reachability and round-trip time to any host.',
    href: '/tools/ping',
    available: false,
  },
  {
    name: 'Port Check',
    description: 'Check if a specific port is open on a host.',
    href: '/tools/port-check',
    available: false,
  },
  {
    name: 'IPv6 Test',
    description: 'Verify your IPv6 connectivity and address.',
    href: '/tools/ipv6',
    available: false,
  },
]

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Network Tools</h1>
        <p className="text-neutral-500 text-lg max-w-2xl">
          Free, open-source tools to diagnose and understand your network.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {tools.map(tool => (
          <div key={tool.name} className="relative">
            {tool.available ? (
              <Link
                href={tool.href}
                className="block border border-neutral-200 rounded-xl p-6 hover:border-neutral-400 hover:shadow-sm transition-all group"
              >
                <h2 className="font-medium mb-1 group-hover:text-black transition-colors">
                  {tool.name}
                </h2>
                <p className="text-sm text-neutral-500 leading-relaxed">{tool.description}</p>
                <span className="inline-block mt-3 text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors">
                  Open &rarr;
                </span>
              </Link>
            ) : (
              <div className="block border border-neutral-100 rounded-xl p-6 bg-neutral-50/50">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-medium text-neutral-400 mb-1">{tool.name}</h2>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5 leading-none shrink-0">
                    Soon
                  </span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">{tool.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
