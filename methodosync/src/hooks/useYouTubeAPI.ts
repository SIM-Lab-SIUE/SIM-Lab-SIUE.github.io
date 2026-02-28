import { useState, useEffect } from 'react'

type APIStatus = 'idle' | 'loading' | 'ready' | 'error'

// Module-level singleton — prevents double script injection on hot reload
let apiPromise: Promise<void> | null = null

function loadYouTubeScript(): Promise<void> {
  if (apiPromise) return apiPromise

  apiPromise = new Promise((resolve, reject) => {
    // Already loaded
    if (window.YT?.Player) {
      resolve()
      return
    }

    const existingCallback = window.onYouTubeIframeAPIReady

    window.onYouTubeIframeAPIReady = () => {
      existingCallback?.()
      resolve()
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = () => {
      apiPromise = null
      reject(new Error('Failed to load YouTube IFrame API'))
    }
    document.head.appendChild(script)
  })

  return apiPromise
}

export function useYouTubeAPI(): APIStatus {
  const [status, setStatus] = useState<APIStatus>('idle')

  useEffect(() => {
    setStatus('loading')
    loadYouTubeScript()
      .then(() => setStatus('ready'))
      .catch(() => setStatus('error'))
  }, [])

  return status
}
