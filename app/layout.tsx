import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'netprofile — Network Quality Testing',
  description:
    'Open-source network quality testing. Measure bandwidth, latency, bufferbloat, and packet loss. Self-hostable, no tracking, no ads.',
  openGraph: {
    title: 'netprofile — Network Quality Testing',
    description:
      'Open-source network quality testing. Measure bandwidth, latency, bufferbloat, and packet loss.',
    url: 'https://netprofile.net',
    siteName: 'netprofile',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'netprofile — Network Quality Testing',
    description:
      'Open-source network quality testing. Measure bandwidth, latency, bufferbloat, and packet loss.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-white text-neutral-900 antialiased font-sans flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
