import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { socialMediaProfiles } from '@/components/SocialMedia'

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
      { title: 'Why Choose Us', href: '/process' },
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

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Industry insights newsletter
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Subscribe to get logistics updates, industry news, and supply chain
        best practices delivered to your inbox.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
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
                  <p>Phone: <a href="tel:+12244029537" className="hover:text-neutral-950 transition">+1 (224) 402-9537</a></p>
                  <p>Sales: <a href="tel:+12244029537" className="hover:text-neutral-950 transition">(224) 402-9537</a></p>
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
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-700">
              © CR Express Inc. {new Date().getFullYear()}
            </p>
            <p className="mt-1 text-xs text-neutral-600">
              Serving Chicago and beyond since 1999
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
