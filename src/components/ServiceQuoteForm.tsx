'use client'

import { useId } from 'react'
import { Button } from '@/components/Button'

interface ServiceQuoteFormProps {
  serviceName: string
  serviceType: string
}

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
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
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
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden appearance-none"
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

export function ServiceQuoteForm({ serviceName, serviceType }: ServiceQuoteFormProps) {
  return (
    <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl">
      <h3 className="font-display text-2xl font-semibold text-neutral-950 mb-6">
        Get a Free Quote
      </h3>
      <form>
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
            <option value={serviceType}>{serviceName}</option>
            <option value="warehousing">Bonded Warehouse</option>
            <option value="air-cargo">Air Cargo</option>
            <option value="drayage">Drayage</option>
            <option value="otr">Over the Road</option>
            <option value="local-pd">Local P&D</option>
            <option value="other">Other / Not Sure</option>
          </SelectInput>
        </div>
        <Button type="submit" className="mt-6 w-full">
          Get My Quote
        </Button>
      </form>
      <p className="mt-4 text-sm text-neutral-600 text-center">
        Or call us at{' '}
        <a href="tel:+12244029537" className="font-semibold text-neutral-950 hover:underline">
          +1 (224) 402-9537
        </a>
      </p>
    </div>
  )
}
