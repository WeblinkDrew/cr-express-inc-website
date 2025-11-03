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
      className="prose prose-lg prose-neutral mx-auto mt-12 max-w-5xl
        prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight
        prose-a:font-semibold prose-a:text-neutral-950 prose-a:underline
        hover:prose-a:text-neutral-700
        prose-img:rounded-xl
        prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:bg-neutral-900 prose-pre:p-6
        prose-code:rounded prose-code:bg-neutral-100 prose-code:px-1.5 prose-code:py-0.5
        prose-code:font-mono prose-code:text-sm prose-code:font-normal
        prose-code:before:content-none prose-code:after:content-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
