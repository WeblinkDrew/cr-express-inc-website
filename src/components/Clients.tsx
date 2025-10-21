import Image from 'next/image'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

import logoDHL from '@/images/clients/new-clients/DHL Global Forwarding.svg'
import logoDSV from '@/images/clients/new-clients/DSV Logo Small (1).svg'
import logoGebruder from '@/images/clients/new-clients/Gebrüder Weiss Logo 2020.svg'
import logoHankyu from '@/images/clients/new-clients/Hankyu Hanshin Express logo.svg'
import logoKintetsu from '@/images/clients/new-clients/Kintetsu World Express Logos.svg'
import logoMOL from '@/images/clients/new-clients/MOL Logistics Logo.svg'

const clients = [
  ['DHL Global Forwarding', logoDHL],
  ['DSV', logoDSV],
  ['Gebrüder Weiss', logoGebruder],
  ['Hankyu Hanshin Express', logoHankyu],
  ['Kintetsu World Express', logoKintetsu],
  ['MOL Logistics', logoMOL],
]

export function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-40">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            Trusted by these industry leaders
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-3"
          >
            {clients.map(([client, logo]) => (
              <li key={client} className="flex items-center justify-center transition-transform duration-300 hover:-translate-y-1">
                <FadeIn className="flex items-center justify-center w-full h-16">
                  <Image
                    src={logo}
                    alt={client}
                    unoptimized
                    className={`w-auto h-auto object-contain ${
                      client === 'Kintetsu World Express' || client === 'MOL Logistics' || client === 'Gebrüder Weiss'
                        ? 'max-h-16 max-w-[220px]'
                        : 'max-h-12 max-w-[180px]'
                    }`}
                  />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}
