'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/speedtest', label: 'Speed Test' },
  { href: '/docs', label: 'Docs' },
]

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-lg tracking-tight">netprofile</span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5 leading-none">
            alpha
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                pathname?.startsWith(link.href)
                  ? 'text-neutral-900 font-medium'
                  : 'text-neutral-400 hover:text-neutral-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/netprofilenet"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 -mr-2 text-neutral-500 hover:text-neutral-900"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-neutral-100 bg-white">
          <nav className="px-6 py-4 space-y-3 text-sm">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block ${
                  pathname?.startsWith(link.href)
                    ? 'text-neutral-900 font-medium'
                    : 'text-neutral-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/netprofilenet"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-neutral-500"
            >
              GitHub
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
