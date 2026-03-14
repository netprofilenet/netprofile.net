import type { Metadata } from 'next'
import MyIpClient from '@/components/tools/MyIpClient'

export const metadata: Metadata = {
  title: 'What Is My IP Address? — Free IP Lookup | netprofile',
  description:
    'Instantly find your public IP address, location, ISP, ASN, IPv4 and IPv6 support. Free, no tracking, no ads, open-source.',
  alternates: {
    canonical: 'https://netprofile.net/tools/my-ip',
  },
  openGraph: {
    title: 'What Is My IP Address? — Free IP Lookup',
    description:
      'Find your public IP address, location, ISP, and network details. Free, no tracking, open-source.',
    url: 'https://netprofile.net/tools/my-ip',
    siteName: 'netprofile',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'What Is My IP Address? — netprofile',
    description:
      'Find your public IP address, location, ISP, and network details instantly.',
  },
}

const faqItems = [
  {
    question: 'What is an IP address?',
    answer:
      'An IP (Internet Protocol) address is a unique numerical label assigned to every device connected to the internet. It identifies your device on the network and provides your approximate location. There are two versions: IPv4 (e.g. 192.168.1.1) and IPv6 (e.g. 2001:db8::1).',
  },
  {
    question: 'What is the difference between IPv4 and IPv6?',
    answer:
      'IPv4 addresses are 32-bit numbers written as four decimal octets (e.g. 203.0.113.1), providing about 4.3 billion unique addresses. IPv6 addresses are 128-bit, written in hexadecimal groups (e.g. 2001:db8::1), offering a virtually unlimited address space. IPv6 was created because the world ran out of IPv4 addresses.',
  },
  {
    question: 'Can someone find my location from my IP address?',
    answer:
      'An IP address reveals your approximate location — typically your city and region — but not your exact street address. The accuracy depends on your ISP and how they allocate addresses. Using a VPN or proxy changes the visible IP to the server\u2019s location instead of yours.',
  },
  {
    question: 'Why does my IP address change?',
    answer:
      'Most residential internet connections use dynamic IP addresses, meaning your ISP may assign a different address each time your router reconnects. If you need a fixed address, you can request a static IP from your ISP, which is common for hosting servers or remote access.',
  },
  {
    question: 'What is an ASN?',
    answer:
      'An ASN (Autonomous System Number) identifies a network operated by a single organization — typically an ISP, cloud provider, or large enterprise. It\u2019s used in BGP routing to direct traffic between networks on the internet.',
  },
  {
    question: 'What does dual-stack mean?',
    answer:
      'Dual-stack means your connection supports both IPv4 and IPv6 simultaneously. This ensures compatibility with older IPv4-only services while taking advantage of the larger IPv6 address space. You can check your dual-stack support with the tool above.',
  },
]

function FaqJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function WebAppJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'What Is My IP Address — netprofile',
    url: 'https://netprofile.net/tools/my-ip',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Find your public IP address, location, ISP, ASN, and dual-stack support. Free, open-source, no tracking.',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function MyIpPage() {
  return (
    <>
      <FaqJsonLd />
      <WebAppJsonLd />
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">What is my IP address?</h1>
          <p className="text-neutral-500 text-lg max-w-2xl">
            Your public IP address and network information, detected automatically.
            No tracking, no ads — just your data.
          </p>
        </div>

        <MyIpClient />

        {/* FAQ sections */}
        <section className="mt-20 border-t border-neutral-200 pt-12">
          <h2 className="font-serif text-2xl mb-8">Frequently asked questions</h2>
          <div className="space-y-8 max-w-2xl">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-base font-medium text-neutral-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
