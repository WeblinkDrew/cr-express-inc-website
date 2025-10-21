import Link from 'next/link'
import { Container } from '@/components/Container'
import type { CityData } from '@/lib/location-data'

interface BreadcrumbProps {
  city: CityData
}

export function Breadcrumb({ city }: BreadcrumbProps) {
  const currentUrl = `https://crexpressinc.com/locations/${city.slug}`

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav className="border-b border-neutral-200 bg-neutral-50" aria-label="Breadcrumb">
        <Container>
          <ol
            className="flex items-center gap-2 py-4 text-sm"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/"
                itemProp="item"
                className="text-neutral-600 hover:text-neutral-950 transition"
              >
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>

            <li className="text-neutral-400">/</li>

            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <Link
                href="/services/warehousing"
                itemProp="item"
                className="text-neutral-600 hover:text-neutral-950 transition"
              >
                <span itemProp="name">Bonded Warehouse Services</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>

            <li className="text-neutral-400">/</li>

            <li
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <span
                itemProp="item"
                itemID={currentUrl}
                className="font-semibold text-neutral-950"
              >
                <span itemProp="name">{city.name}, {city.state}</span>
              </span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </Container>
      </nav>
    </>
  )
}
