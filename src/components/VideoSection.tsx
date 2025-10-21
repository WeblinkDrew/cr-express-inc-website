'use client'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { useEffect, useRef, useState } from 'react'
import { PlayIcon } from '@heroicons/react/24/solid'

export function VideoSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVideoLoaded) {
            setIsVideoLoaded(true)
            // Auto-play only on desktop
            if (!isMobile) {
              setIsPlaying(true)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
    }
  }, [isVideoLoaded, isMobile])

  const handlePlayClick = () => {
    setIsPlaying(true)
  }

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
          drayage operations to air cargo services at O&apos;Hare, discover what makes
          CR Express your trusted logistics partner.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeIn>
          <div
            ref={containerRef}
            className="relative aspect-video overflow-hidden rounded-3xl bg-neutral-100"
          >
            {isVideoLoaded && isPlaying && (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/A7kVqkvFzxE?autoplay=1&mute=1&controls=${isMobile ? '1' : '0'}&rel=0`}
                title="CR Express Facility Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}

            {/* Play Button Overlay - shown on mobile when not playing */}
            {isVideoLoaded && !isPlaying && isMobile && (
              <button
                onClick={handlePlayClick}
                className="absolute inset-0 flex items-center justify-center bg-neutral-950/50 transition-all hover:bg-neutral-950/60"
                aria-label="Play video"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-xl transition-transform hover:scale-110">
                  <PlayIcon className="h-10 w-10 translate-x-0.5 text-neutral-950" />
                </div>
              </button>
            )}

            {/* Thumbnail/Loading state */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
                <div className="h-12 w-12 animate-pulse rounded-full bg-neutral-300" />
              </div>
            )}
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
