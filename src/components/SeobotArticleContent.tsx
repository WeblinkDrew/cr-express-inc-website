'use client'

import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

export function SeobotArticleContent({ html }: { html: string }) {
  useEffect(() => {
    // Highlight code blocks after component mounts
    hljs.highlightAll()
  }, [html])

  return (
    <div
      className="typography mx-auto mt-12 max-w-5xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
