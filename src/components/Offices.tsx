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
        <Office name="Second Facility" invert={invert}>
          301 W Oakton St
          <br />
          Des Plaines, IL 60018
        </Office>
      </li>
      <li>
        <Office name="Contact" invert={invert}>
          Phone: +1 (224) 402-9537
          <br />
          Sales: (224) 402-9537
        </Office>
      </li>
    </ul>
  )
}
