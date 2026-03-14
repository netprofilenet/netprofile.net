'use client'

import { useCopyToClipboard } from '@/lib/useCopyToClipboard'

export default function CopyBlock({ text }: { text: string }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="relative group">
      <pre className="bg-neutral-900 text-neutral-100 rounded-lg px-5 py-4 pr-14 text-sm font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap break-all">
        {text}
      </pre>
      <button
        onClick={() => copy(text)}
        className="absolute top-3 right-3 p-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
        )}
      </button>
    </div>
  )
}
