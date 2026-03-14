'use client'

import { useCopyToClipboard } from '@/lib/useCopyToClipboard'

export default function CopyLinkButton() {
  const { copied, copy } = useCopyToClipboard()

  return (
    <button
      onClick={() => copy(window.location.href)}
      className="inline-flex items-center gap-2 border border-neutral-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:border-neutral-400 transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.12 7.48l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.591-1.59M10.82 15.312a4.5 4.5 0 01-1.12-7.48l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.591 1.59" />
          </svg>
          Copy link
        </>
      )}
    </button>
  )
}
