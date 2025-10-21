import clsx from 'clsx'

export function TagList({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ul role="list" className={clsx(className, 'flex flex-wrap gap-4')}>
      {children}
    </ul>
  )
}

export function TagListItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <li
      className={clsx(
        'rounded-full bg-[#F5F7F9] px-3 py-1 text-sm font-medium text-[#2C3E50] border border-[#13B5EA]/20',
        className,
      )}
    >
      {children}
    </li>
  )
}
