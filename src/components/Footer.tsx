import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'
import { NewsletterForm } from '@/components/NewsletterForm'

const navigation = [
  {
    title: 'Services',
    links: [
      { title: 'Bonded Warehouse', href: '/services/warehousing' },
      { title: 'Air Cargo', href: '/services/air-cargo' },
      { title: 'Drayage', href: '/services/drayage' },
      { title: 'Over the Road', href: '/services/over-the-road' },
      { title: 'Local P&D', href: '/services/local-pd' },
      {
        title: (
          <>
            All Services <span aria-hidden="true">&rarr;</span>
          </>
        ),
        href: '/services',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '/about' },
      { title: 'Why Choose Us', href: '/why-choose-us' },
      { title: 'Blog', href: '/blog' },
      { title: 'Careers', href: '/careers' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    links: socialMediaProfiles,
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16">
          <Navigation />
          <div className="border-t border-neutral-950/10 pt-16">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
              <div className="max-w-sm">
                <NewsletterForm />
              </div>
              <div className="lg:text-right">
                <h3 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
                  Quick Contact
                </h3>
                <div className="mt-4 text-sm text-neutral-700 space-y-2">
                  <p>Main: 2400 Arthur Ave, Elk Grove Village, IL 60007</p>
                  <p>Second: 301 W Oakton St, Des Plaines, IL 60018</p>
                  <p>Sales: <a href="tel:+12244029537" className="hover:text-neutral-950 transition">+1 (224) 402-9537</a></p>
                  <p>Operations: <a href="tel:+18473547979" className="hover:text-neutral-950 transition">+1 (847) 354-7979</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <div className="flex flex-col gap-y-2">
            <Link href="/" aria-label="Home">
              <Logo className="h-8" fillOnHover />
            </Link>
            <p className="text-xs text-neutral-600">
              MC-721384 | DOT-1717205
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Built by{' '}
              <a
                href="https://www.goweblink.io"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:text-neutral-700 transition-colors"
              >
                Weblink
              </a>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-700">
              © CR Express Inc. {new Date().getFullYear()}
            </p>
            <p className="mt-1 text-xs text-neutral-600">
              Serving Chicago and beyond since 1999
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              This site is protected by reCAPTCHA and the Google{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:text-neutral-700 transition-colors underline"
              >
                Privacy Policy
              </a>
              {' '}and{' '}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:text-neutral-700 transition-colors underline"
              >
                Terms of Service
              </a>
              {' '}apply.
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
