import type { Metadata } from 'next'
import MyIpClient from '@/components/tools/MyIpClient'

export const metadata: Metadata = {
  title: 'What Is My IP Address? — netprofile',
  description:
    'See your public IP address, location, ISP, and network details instantly. Free, no tracking, open-source.',
  openGraph: {
    title: 'What Is My IP Address? — netprofile',
    description: 'See your public IP address, location, ISP, and network details instantly.',
  },
}

export default function MyIpPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-10">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">What is my IP address?</h1>
        <p className="text-neutral-500 text-lg max-w-2xl">
          Your public IP address and network information, detected automatically.
        </p>
      </div>

      <MyIpClient />

      {/* SEO content */}
      <section className="mt-20 border-t border-neutral-200 pt-12">
        <h2 className="font-serif text-2xl mb-4">What is an IP address?</h2>
        <div className="text-sm text-neutral-500 leading-relaxed space-y-3 max-w-2xl">
          <p>
            An IP (Internet Protocol) address is a unique numerical label assigned to every device
            connected to the internet. It serves two purposes: identifying your device on the network
            and providing your general location.
          </p>
          <p>
            There are two versions in use today. IPv4 addresses look like <code className="bg-neutral-100 px-1 rounded text-xs">192.168.1.1</code> and
            are 32-bit numbers, while IPv6 addresses like <code className="bg-neutral-100 px-1 rounded text-xs">2001:db8::1</code> are
            128-bit, created to address the exhaustion of IPv4 space.
          </p>
          <p>
            Your ISP (Internet Service Provider) assigns your public IP address. It may change
            periodically (dynamic IP) or remain fixed (static IP), depending on your plan.
            The IP shown above is what websites and services see when you connect to them.
          </p>
        </div>
      </section>
    </div>
  )
}
