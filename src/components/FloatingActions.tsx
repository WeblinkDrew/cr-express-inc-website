'use client'

import Link from 'next/link'

export function FloatingActions() {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
      <Link
        href="https://customers.xpresstrax.com/PGCommon/Tracing.aspx?id=GD7aNVsUcVs%3D&ltr=6zcOsHDiKmw%3D"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-neutral-950 shadow-lg ring-1 ring-neutral-950/10 transition hover:bg-neutral-50 hover:shadow-xl"
      >
        <svg
          className="h-5 w-5 flex-none"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
          />
        </svg>
        <span>Track Shipment</span>
      </Link>

      <Link
        href="/contact"
        className="group flex items-center gap-3 rounded-full bg-neutral-950 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-neutral-800 hover:shadow-xl"
      >
        <svg
          className="h-5 w-5 flex-none"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
        <span>Get a Quote</span>
      </Link>
    </div>
  )
}
