import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation — netprofile',
  description: 'Learn how to use netprofile for network quality testing.',
}

const DOCS = [
  {
    href: '/docs/getting-started',
    title: 'Getting Started',
    desc: 'Install the server and run your first quality test in under a minute.',
  },
]

export default function DocsIndex() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl md:text-4xl mb-8">Documentation</h1>
      <div className="space-y-4">
        {DOCS.map(d => (
          <Link
            key={d.href}
            href={d.href}
            className="block border border-neutral-200 rounded-xl p-6 hover:border-neutral-400 transition-colors"
          >
            <div className="font-medium mb-1">{d.title}</div>
            <div className="text-sm text-neutral-500">{d.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
