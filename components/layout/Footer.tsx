import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50/50">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-serif text-lg">netprofile</span>
            <p className="text-neutral-400 mt-2 text-xs leading-relaxed max-w-[200px]">
              Open-source network quality testing. No tracking. No ads.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">Product</h3>
            <ul className="space-y-2 text-neutral-500">
              <li><Link href="/speedtest" className="hover:text-neutral-900 transition-colors">Speed Test</Link></li>
              <li><Link href="/servers" className="hover:text-neutral-900 transition-colors">Servers</Link></li>
              <li><Link href="/host" className="hover:text-neutral-900 transition-colors">Host a Server</Link></li>
              <li><Link href="/tools/my-ip" className="hover:text-neutral-900 transition-colors">What Is My IP</Link></li>
              <li><Link href="/docs" className="hover:text-neutral-900 transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Open Source */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">Open Source</h3>
            <ul className="space-y-2 text-neutral-500">
              <li>
                <a href="https://github.com/netprofilenet/qoe-go-server" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
                  qoe-go-server
                </a>
              </li>
              <li>
                <a href="https://github.com/netprofilenet/qoe-js" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
                  qoe-js
                </a>
              </li>
              <li>
                <a href="https://github.com/netprofilenet/qoe-go" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
                  qoe-go
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/@netprofile/qoe-js" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
                  npm
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-medium text-neutral-400 uppercase tracking-wider mb-3">Connect</h3>
            <ul className="space-y-2 text-neutral-500">
              <li>
                <a href="https://github.com/netprofilenet" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-200/60 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-400">
          <span>&copy; {new Date().getFullYear()} netprofile</span>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  )
}
