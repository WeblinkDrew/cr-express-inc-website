import { type Metadata } from 'next'
import localFont from 'next/font/local'

import '@/styles/tailwind.css'
import { ReCaptchaProvider } from '@/components/ReCaptchaProvider'
import StackProvider from '@/components/providers/StackProvider'

const monaSans = localFont({
  src: '../fonts/Mona-Sans.var.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.crexpressinc.com'),
  title: {
    template: '%s | CR Express',
    default: 'CR Express - Chicago Bonded Warehouse & Logistics Services Since 1999',
  },
  description: 'Leading Chicago logistics company providing bonded warehouse services, air cargo, intermodal drayage, and nationwide freight. CBW Class 3 certified, 26+ years experience, less than 5 miles from O\'Hare.',
  keywords: ['bonded warehouse Chicago', 'logistics services', 'air cargo O\'Hare', 'intermodal drayage', 'freight shipping', 'customs bonded warehouse', 'CBW Class 3', 'Elk Grove Village warehouse'],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.crexpressinc.com',
    siteName: 'CR Express',
    title: 'CR Express - Chicago Bonded Warehouse & Logistics Services',
    description: 'Leading Chicago logistics company providing bonded warehouse services, air cargo, intermodal drayage, and nationwide freight. CBW Class 3 certified, 26+ years experience.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CR Express Logistics Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CR Express - Chicago Bonded Warehouse & Logistics Services',
    description: 'Leading Chicago logistics company providing bonded warehouse services, air cargo, intermodal drayage, and nationwide freight. CBW Class 3 certified.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.crexpressinc.com',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full bg-neutral-950 text-base antialiased ${monaSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="flex min-h-full flex-col">
        <StackProvider>
          <ReCaptchaProvider>{children}</ReCaptchaProvider>
        </StackProvider>
      </body>
    </html>
  )
}
