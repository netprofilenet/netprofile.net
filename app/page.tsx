import Link from 'next/link'
import QuickTest from '@/components/speedtest/QuickTest'

export default function Home() {
  return (
    <>
      {/* ──── Hero ──── */}
      <section className="relative overflow-hidden noise-bg">
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 md:pt-36 md:pb-28">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] max-w-3xl">
            Know your<br />network.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-500 max-w-xl leading-relaxed">
            Not just speed — quality. Latency, bufferbloat, packet loss,
            application readiness. Open source, no tracking, no ads.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#test"
              className="bg-neutral-900 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-black transition-colors"
            >
              Test My Connection
            </a>
            <a
              href="https://github.com/netprofilenet"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-300 px-6 py-3 rounded-lg text-sm font-medium text-neutral-600 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </section>

      {/* ──── Quick Test ──── */}
      <section id="test" className="border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
          <QuickTest />
        </div>
      </section>

      {/* ──── What We Measure ──── */}
      <section className="border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Three ways to test.</h2>
          <p className="text-neutral-500 mb-14 max-w-lg">
            Different questions need different measurements. Pick the mode that matches
            what you want to know.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <ModeCard
              title="Quality"
              tag="Real-world performance"
              description="Single-connection test with bufferbloat detection and quality scoring. Measures what your connection actually feels like for everyday use."
              best="Understanding your actual experience"
            />
            <ModeCard
              title="Speed"
              tag="Peak capacity"
              description="Parallel-connection test that saturates your link to find maximum throughput. The number your ISP advertises."
              best="Checking what you pay for"
            />
            <ModeCard
              title="Application"
              tag="Workload simulation"
              description="Tests tailored for streaming, gaming, and video calls. Measures the metrics that matter for each activity."
              best="Knowing what your connection handles"
            />
          </div>
        </div>
      </section>

      {/* ──── Why netprofile ──── */}
      <section className="bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-4xl mb-14">Why this exists.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h3 className="font-medium text-lg mb-3">More than speed</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Your 500 Mbps connection feels slow? It&apos;s probably latency or
                bufferbloat, not bandwidth. We measure the metrics that actually
                determine your experience.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-3">Open source &amp; self-hostable</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Your infrastructure, your data. MIT licensed. Run the test server
                on your own network for internal benchmarking, or use our public
                servers. No accounts, no tracking.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-3">Works everywhere</h3>
              <p className="text-neutral-400 leading-relaxed text-sm">
                Browser, CLI, Go library — same protocol, same server. Automate
                network quality monitoring in CI, run ad-hoc tests from your
                terminal, or embed tests in your own app.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Vision ──── */}
      <section className="border-b border-neutral-100">
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">This is just the start.</h2>
          <p className="text-neutral-500 leading-relaxed max-w-xl mx-auto">
            netprofile begins with speed and quality testing, but we&apos;re building
            the open-source toolkit for understanding your internet connection.
            Network diagnostics, monitoring, traceroute visualization, ISP
            comparison, historical trends — all open, all yours.
          </p>
          <p className="mt-6 text-sm text-neutral-400">
            Want to help shape what comes next?{' '}
            <a
              href="https://github.com/netprofilenet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 underline underline-offset-2 hover:no-underline"
            >
              Join us on GitHub.
            </a>
          </p>
        </div>
      </section>

      {/* ──── Open Source ──── */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Built in the open.</h2>
          <p className="text-neutral-500 mb-14 max-w-lg">
            Three repositories, one protocol. Pick the tool that fits your stack.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RepoCard
              name="qoe-go-server"
              description="Test server. Go + Docker. Handles bandwidth, latency, and WebRTC signaling."
              language="Go"
              url="https://github.com/netprofilenet/qoe-go-server"
              install="docker run -p 3000:3000 ghcr.io/netprofile/qoe:latest"
            />
            <RepoCard
              name="qoe-js"
              description="Browser client library. TypeScript. ESM. Works in any framework."
              language="TypeScript"
              url="https://github.com/netprofilenet/qoe-js"
              install="npm install @netprofile/qoe-js"
            />
            <RepoCard
              name="qoe-go"
              description="Go client library + CLI. Same protocol. Automate testing from your terminal."
              language="Go"
              url="https://github.com/netprofilenet/qoe-go"
              install="go install github.com/netprofile/qoe-go/cmd/qoe@latest"
            />
          </div>

          {/* Usage example */}
          <div className="mt-14 max-w-lg">
            <p className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Quick start</p>
            <pre className="!bg-neutral-950 !text-neutral-300 !rounded-xl !px-5 !py-4 text-sm leading-relaxed">
              <code>{`import { QOEClient } from '@netprofile/qoe-js'

const client = new QOEClient()
client.setServer({ httpUrl: 'http://localhost:3000', ... })
const results = await client.runQualityTest()
console.log(results.download.bandwidthMbps, 'Mbps')`}</code>
            </pre>
          </div>
        </div>
      </section>
    </>
  )
}

/* ──── Sub-components ──── */

function ModeCard({
  title,
  tag,
  description,
  best,
}: {
  title: string
  tag: string
  description: string
  best: string
}) {
  return (
    <div className="group">
      <div className="text-xs text-neutral-400 uppercase tracking-wider mb-2">{tag}</div>
      <h3 className="font-serif text-2xl mb-3">{title}</h3>
      <p className="text-sm text-neutral-500 leading-relaxed mb-4">{description}</p>
      <p className="text-xs text-neutral-400">
        Best for: <span className="text-neutral-600">{best}</span>
      </p>
    </div>
  )
}

function RepoCard({
  name,
  description,
  language,
  url,
  install,
}: {
  name: string
  description: string
  language: string
  url: string
  install: string
}) {
  return (
    <div className="border border-neutral-200 rounded-xl p-6 flex flex-col hover:border-neutral-400 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5">
          {language}
        </span>
      </div>
      <p className="text-sm text-neutral-500 leading-relaxed mb-4 flex-1">{description}</p>
      <pre className="!bg-neutral-100 !text-neutral-700 !rounded-lg !px-3 !py-2 text-xs mb-4 overflow-x-auto">
        <code>{install}</code>
      </pre>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
      >
        View on GitHub &rarr;
      </a>
    </div>
  )
}
