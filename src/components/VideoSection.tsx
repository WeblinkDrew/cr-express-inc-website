'use client'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { useEffect, useRef, useState } from 'react'

export function VideoSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVideoLoaded) {
            setIsVideoLoaded(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [isVideoLoaded])

  return (
    <>
      <SectionIntro
        eyebrow="See Us In Action"
        title="Experience CR Express logistics excellence"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Take a virtual tour of our 280,000 sq ft bonded warehouse facility and
          see how we handle your cargo with precision and care. From our intermodal
          drayage operations to air cargo services at O'Hare, discover what makes
          CR Express your trusted logistics partner.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeIn>
          <div
            ref={containerRef}
            className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-100"
          >
            {isVideoLoaded && (
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/A7kVqkvFzxE?autoplay=1&mute=1&controls=0&rel=0"
                title="CR Express Facility Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
