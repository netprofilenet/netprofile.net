'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available in insecure context
    }
  }, [])

  return { copied, copy }
}
