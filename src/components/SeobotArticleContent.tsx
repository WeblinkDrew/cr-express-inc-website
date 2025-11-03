'use client'

import { useEffect, useMemo } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

export function SeobotArticleContent({ html }: { html: string }) {
  // Process HTML to fix images and iframes
  const processedHtml = useMemo(() => {
    let processedContent = html

    // Fix image URLs that might have CORS issues
    // Replace direct image URLs with Next.js image API proxy
    processedContent = processedContent.replace(
      /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi,
      (match, before, src, after) => {
        // If the image is from assets.seobotai.com, use Next.js image API
        if (src.includes('assets.seobotai.com')) {
          // Use Next.js image optimization API
          const proxiedSrc = `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`
          return `<img ${before}src="${proxiedSrc}"${after}>`
        }
        return match
      }
    )

    // Fix YouTube embeds - add proper iframe attributes
    processedContent = processedContent.replace(
      /<iframe\s+([^>]*?)src=["']([^"']*youtube[^"']*)["']([^>]*?)>/gi,
      (match, before, src, after) => {
        // Ensure YouTube embeds have proper attributes
        const hasTitle = /title=/i.test(match)
        const hasLoading = /loading=/i.test(match)

        let attributes = ''
        if (!hasTitle) attributes += ' title="YouTube video"'
        if (!hasLoading) attributes += ' loading="lazy"'

        // Add sandbox attribute to prevent JavaScript errors
        if (!/sandbox=/i.test(match)) {
          attributes += ' sandbox="allow-same-origin allow-scripts allow-popups allow-presentation allow-popups-to-escape-sandbox"'
        }

        return `<iframe ${before}src="${src}"${after}${attributes}>`
      }
    )

    return processedContent
  }, [html])

  useEffect(() => {
    // Highlight code blocks after component mounts
    hljs.highlightAll()

    // Clean up YouTube embed errors
    const handleError = (e: ErrorEvent) => {
      // Suppress YouTube-related errors that don't affect functionality
      if (
        e.message?.includes('youtube') ||
        e.message?.includes('YT') ||
        e.filename?.includes('youtube.com')
      ) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    }

    window.addEventListener('error', handleError, true)

    return () => {
      window.removeEventListener('error', handleError, true)
    }
  }, [processedHtml])

  return (
    <div
      className="typography mx-auto mt-12 max-w-5xl [&_iframe]:aspect-video [&_iframe]:w-full [&_iframe]:rounded-xl [&_img]:rounded-xl [&_img]:my-8"
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  )
}
