import clsx from 'clsx'

import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'
import { StatList, StatListItem } from '@/components/StatList'
import { TagList, TagListItem } from '@/components/TagList'

export const MDXComponents = {
  Blockquote({
    className,
    image,
    ...props
  }: React.ComponentPropsWithoutRef<typeof Blockquote>) {
    // Remove image prop to always use quote-only format for services
    return <Blockquote className={clsx('my-32', className)} {...props} />
  },
  img: function Img({
    className,
    src,
    alt,
    ...props
  }: React.ComponentPropsWithoutRef<'img'>) {
    return (
      <div
        className={clsx(
          'relative my-10 overflow-hidden rounded-4xl bg-neutral-100 max-sm:-mx-6 aspect-[16/10]',
          className,
        )}
      >
        <img
          src={src}
          alt={alt || ''}
          className="absolute inset-0 h-full w-full object-cover"
          {...props}
        />
      </div>
    )
  },
  iframe: function Iframe({
    className,
    src,
    ...props
  }: React.ComponentPropsWithoutRef<'iframe'>) {
    return (
      <div
        className={clsx(
          'relative my-10 overflow-hidden rounded-4xl bg-neutral-950 max-sm:-mx-6',
          className,
        )}
        style={{ aspectRatio: '16/9' }}
      >
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allowFullScreen
          {...props}
        />
      </div>
    )
  },
  StatList({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof StatList>) {
    return (
      <StatList className={clsx('my-32 max-w-none!', className)} {...props} />
    )
  },
  StatListItem,
  table: function Table({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<'table'>) {
    return (
      <div
        className={clsx(
          'my-10 max-sm:-mx-6 max-sm:flex max-sm:overflow-x-auto',
          className,
        )}
      >
        <div className="max-sm:min-w-full max-sm:flex-none max-sm:px-6">
          <table {...props} />
        </div>
      </div>
    )
  },
  TagList({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof TagList>) {
    return <TagList className={clsx('my-6', className)} {...props} />
  },
  TagListItem,
  TopTip({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) {
    return (
      <Border position="left" className={clsx('my-10 pl-8', className)}>
        <p className="font-display text-sm font-bold tracking-widest text-neutral-950 uppercase">
          Top tip
        </p>
        <div className="mt-4">{children}</div>
      </Border>
    )
  },
  Typography({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    return <div className={clsx('typography', className)} {...props} />
  },
  wrapper({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    // Filter out Next.js page props that shouldn't be spread to DOM elements
    const { searchParams, params, ...domProps } = props as any
    return (
      <div
        className={clsx(
          '*:mx-auto *:max-w-3xl [&>:first-child]:mt-0! [&>:last-child]:mb-0!',
          className,
        )}
        {...domProps}
      />
    )
  },
}
