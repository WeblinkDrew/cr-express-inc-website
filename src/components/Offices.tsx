import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Main Facility" invert={invert}>
          2400 Arthur Ave
          <br />
          Elk Grove Village, IL 60007
        </Office>
      </li>
      <li>
        <Office name="Contact" invert={invert}>
          Phone: (847) 354-7979
          <br />
          Alt: (224) 402-9537
        </Office>
      </li>
    </ul>
  )
}
