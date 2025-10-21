import Image from 'next/image'
import clsx from 'clsx'
import logoLight from '@/images/cr-express-logo-light.svg'
import logoDark from '@/images/cr-express-logo-dark.svg'

export function Logomark({
  invert = false,
  filled = false,
  className,
}: React.ComponentPropsWithoutRef<'div'> & {
  invert?: boolean
  filled?: boolean
}) {
  return (
    <Image
      src={invert ? logoLight : logoDark}
      alt="CR Express"
      className={clsx('h-10 w-auto sm:h-16', className)}
      unoptimized
      priority
    />
  )
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
}: React.ComponentPropsWithoutRef<'div'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    <Image
      src={invert ? logoLight : logoDark}
      alt="CR Express"
      className={clsx('h-10 w-auto sm:h-16', className)}
      unoptimized
      priority
    />
  )
}
