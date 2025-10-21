import { useId } from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { RootLayout } from '@/components/RootLayout'

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

function CheckboxInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="checkbox"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded border border-neutral-950/20 outline-hidden checked:border-neutral-950 checked:bg-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

function ContactForm() {
  return (
    <FadeIn className="lg:order-last">
      <form>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Get in touch
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label="Name" name="name" autoComplete="name" />
          <TextInput label="Company" name="company" autoComplete="organization" />
          <TextInput
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
          />
          <TextInput label="Phone" type="tel" name="phone" autoComplete="tel" />
          <TextInput label="City" name="city" autoComplete="address-level2" />
          <TextInput label="State" name="state" autoComplete="address-level1" />
          <SelectInput label="Category for your message" name="category">
            <option value="">Select a category for your message</option>
            <option value="general-inquiry">General Inquiry</option>
            <option value="air-import-export">Air Import / Export</option>
            <option value="local-operations">Local OBD / Chicago Operations</option>
            <option value="otr-operations">OTR Operations</option>
            <option value="imdl-operations">IMDL Operations</option>
            <option value="3pl-operations">3PL Operations</option>
            <option value="accounting-billing">Accounting / Billing</option>
            <option value="freight-tracking">Freight Tracking</option>
            <option value="claims-disputes">Claims & Disputes</option>
            <option value="feedback-suggestions">Feedback & Suggestions</option>
            <option value="careers-hr">Careers & HR</option>
          </SelectInput>
          <TextInput label="Message" name="message" />
        </div>
        <Button type="submit" className="mt-10">
          Send Message
        </Button>
      </form>
    </FadeIn>
  )
}

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Our facility
      </h2>
      <p className="mt-6 text-base text-neutral-600">
        Visit our 280,000 sq ft CBW Class 3 certified bonded warehouse facility,
        strategically located less than 5 miles from O'Hare International Airport.
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Contact information
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Main Office', '(847) 354-7979'],
            ['Alternative', '(224) 402-9537'],
          ].map(([label, phone]) => (
            <div key={phone}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                <Link
                  href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                  className="text-neutral-600 hover:text-neutral-950"
                >
                  {phone}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <dt className="font-semibold text-neutral-950 text-sm">Credentials</dt>
          <dd className="mt-2 text-sm text-neutral-600">
            MC-721384 | DOT-1717205
          </dd>
        </div>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Connect with us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Contact CR Express | Get a Logistics Quote',
  description: 'Contact CR Express for bonded warehouse, air cargo, drayage, and freight services. Located in Elk Grove Village, IL near O\'Hare Airport. Call (847) 354-7979.',
}

export default function Contact() {
  return (
    <RootLayout>
      <PageIntro eyebrow="Get in touch" title="Ready to optimize your supply chain?">
        <p>
          Get a quote for our bonded warehouse, air cargo, drayage, or freight services.
          Our logistics experts are ready to provide customized solutions for your business.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </RootLayout>
  )
}
