'use client'

import { useRef, type ReactNode } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(19, 181, 234, 0.1)',
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const rect = divRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    divRef.current.style.setProperty('--mouse-x', `${x}px`)
    divRef.current.style.setProperty('--mouse-y', `${y}px`)
    divRef.current.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:border-neutral-300 sm:p-8 ${className}`}
      style={
        {
          '--mouse-x': '50%',
          '--mouse-y': '50%',
          '--spotlight-color': spotlightColor,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
