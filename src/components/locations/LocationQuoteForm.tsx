'use client'

import { useId } from 'react'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Button } from '@/components/Button'
import type { CityData } from '@/lib/location-data'

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function SelectInput({
  label,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'select'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <select
        id={id}
        {...props}
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden appearance-none"
      >
        {children}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-not-[:placeholder-shown]:-translate-y-4 peer-not-[:placeholder-shown]:scale-75 peer-not-[:placeholder-shown]:font-semibold peer-not-[:placeholder-shown]:text-neutral-950"
      >
        {label}
      </label>
      <div className="pointer-events-none absolute right-6 top-1/2 -mt-2">
        <svg className="h-4 w-4 fill-neutral-950" viewBox="0 0 16 16">
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z" />
        </svg>
      </div>
    </div>
  )
}

interface LocationQuoteFormProps {
  city: CityData
}

export function LocationQuoteForm({ city }: LocationQuoteFormProps) {
  return (
    <div className="mt-24 sm:mt-32 bg-neutral-50 py-24">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
          {/* Form */}
          <FadeIn>
            <h2 className="font-display text-3xl font-semibold text-neutral-950 sm:text-4xl">
              Get a quote for {city.name}
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              Request pricing for bonded warehouse storage, container transloading,
              or customs brokerage services. Our team will respond within 24 hours.
            </p>

            <form className="mt-10">
              <div className="isolate -space-y-px rounded-2xl bg-white/50">
                <TextInput label="Name" name="name" autoComplete="name" />
                <TextInput label="Company" name="company" autoComplete="organization" />
                <TextInput
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                />
                <TextInput label="Phone" type="tel" name="phone" autoComplete="tel" />
                <SelectInput label="Service Needed" name="service">
                  <option value="">Select a service</option>
                  <option value="bonded-warehouse">Bonded Warehouse Storage</option>
                  <option value="container-transloading">Container Transloading</option>
                  <option value="customs-brokerage">Customs Brokerage</option>
                  <option value="drayage">Intermodal Drayage</option>
                  <option value="air-cargo">Air Cargo Services</option>
                  <option value="general-inquiry">General Inquiry</option>
                </SelectInput>
                <TextInput label="Message or special requirements" name="message" />
              </div>
              <Button type="submit" className="mt-10">
                Request Quote
              </Button>
            </form>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn>
            <div className="rounded-3xl bg-neutral-950 p-12 text-white">
              <h3 className="font-display text-2xl font-semibold">
                Or contact us directly
              </h3>
              <p className="mt-4 text-neutral-300">
                Speak with our bonded warehouse team to discuss your specific needs.
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <dt className="text-sm font-semibold text-neutral-400">Main Office</dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+18473547979"
                      className="text-2xl font-semibold hover:text-neutral-300 transition"
                    >
                      (847) 354-7979
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-semibold text-neutral-400">Alternative</dt>
                  <dd className="mt-2">
                    <a
                      href="tel:+12244029537"
                      className="text-2xl font-semibold hover:text-neutral-300 transition"
                    >
                      (224) 402-9537
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-semibold text-neutral-400">Address</dt>
                  <dd className="mt-2 text-neutral-300">
                    2400 Arthur Ave<br />
                    Elk Grove Village, IL 60007
                  </dd>
                </div>

                <div>
                  <dt className="text-sm font-semibold text-neutral-400">
                    Distance from {city.name}
                  </dt>
                  <dd className="mt-2 text-neutral-300">
                    {city.distance} miles ({city.drivingTime} minute drive)
                  </dd>
                </div>

                <div className="pt-8 border-t border-neutral-700">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-neutral-300 transition"
                  >
                    Visit full contact page
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  )
}
