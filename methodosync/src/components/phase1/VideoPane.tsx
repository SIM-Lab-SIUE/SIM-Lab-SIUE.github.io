import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { Play } from 'lucide-react'
import { useYouTubeAPI } from '../../hooks/useYouTubeAPI'
import { useAppStore } from '../../store/useAppStore'
import type { YTPlayer, YTPlayerEvent } from '../../types/annotation'

export interface VideoPaneHandle {
  getCurrentTime: () => number
  pauseVideo: () => void
  playVideo: () => void
}

function extractVideoId(input: string): string | null {
  const trimmed = input.trim()
  // youtu.be short links
  const shortMatch = trimmed.match(/youtu\.be\/([^?&\s]+)/)
  if (shortMatch) return shortMatch[1]
  // Standard youtube.com/watch?v=...
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    const v = url.searchParams.get('v')
    if (v) return v
  } catch {
    // Not a URL — assume it's a bare video ID (11 chars)
    if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed
  }
  return null
}

interface VideoPaneProps {
  onTimeCapture: (time: number) => void
}

export const VideoPane = forwardRef<VideoPaneHandle, VideoPaneProps>(
  ({ onTimeCapture }, ref) => {
    const apiStatus = useYouTubeAPI()
    const setVideoId = useAppStore((s) => s.setVideoId)
    const setPlayerState = useAppStore((s) => s.setPlayerState)

    const [urlInput, setUrlInput] = useState('')
    const [loadedVideoId, setLoadedVideoId] = useState<string | null>(null)
    const [error, setError] = useState('')

    const playerContainerRef = useRef<HTMLDivElement>(null)
    const playerRef = useRef<YTPlayer | null>(null)

    // Expose imperative handle for parent
    useImperativeHandle(ref, () => ({
      getCurrentTime: () => playerRef.current?.getCurrentTime() ?? 0,
      pauseVideo: () => playerRef.current?.pauseVideo(),
      playVideo: () => playerRef.current?.playVideo(),
    }))

    // Create/recreate player when videoId changes and API is ready
    useEffect(() => {
      if (apiStatus !== 'ready' || !loadedVideoId || !playerContainerRef.current) return

      playerRef.current?.destroy()

      const container = playerContainerRef.current
      const playerDiv = document.createElement('div')
      container.innerHTML = ''
      container.appendChild(playerDiv)

      playerRef.current = new window.YT.Player(playerDiv, {
        videoId: loadedVideoId,
        width: '100%',
        height: '100%',
        playerVars: {
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onStateChange: (event: YTPlayerEvent) => {
            setPlayerState(event.data)
          },
        },
      })

      return () => {
        playerRef.current?.destroy()
        playerRef.current = null
      }
    }, [apiStatus, loadedVideoId, setPlayerState])

    function handleLoad() {
      setError('')
      const id = extractVideoId(urlInput)
      if (!id) {
        setError('Could not extract a YouTube video ID. Please check the URL and try again.')
        return
      }
      setLoadedVideoId(id)
      setVideoId(id)
    }

    return (
      <div className="flex flex-col gap-4">
        {/* URL input */}
        <div className="flex gap-2">
          <label htmlFor="yt-url-input" className="sr-only">YouTube URL or Video ID</label>
          <input
            id="yt-url-input"
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLoad()}
            placeholder="Paste a YouTube URL or video ID…"
            className="field-input flex-1"
            aria-describedby={error ? 'yt-url-error' : undefined}
          />
          <button
            onClick={handleLoad}
            className="btn-primary shrink-0"
            aria-label="Load video"
            disabled={apiStatus === 'loading'}
          >
            <Play size={15} aria-hidden="true" />
            {apiStatus === 'loading' ? 'Loading API…' : 'Load'}
          </button>
        </div>

        {error && (
          <p id="yt-url-error" role="alert" className="text-sm" style={{ color: '#c0392b' }}>
            {error}
          </p>
        )}

        {apiStatus === 'error' && (
          <p role="alert" className="text-sm" style={{ color: '#c0392b' }}>
            Failed to load the YouTube IFrame API. Please check your internet connection.
          </p>
        )}

        {/* Player container */}
        <div
          className="w-full rounded-xl overflow-hidden relative"
          style={{
            aspectRatio: '16/9',
            background: 'var(--ink)',
            border: '1px solid var(--stroke)',
          }}
        >
          {!loadedVideoId ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <Play size={24} style={{ color: 'rgba(255,255,255,0.5)' }} aria-hidden="true" />
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Load a YouTube video to begin annotation
              </p>
            </div>
          ) : null}
          <div
            ref={playerContainerRef}
            className="w-full h-full"
            aria-label="YouTube video player"
            style={{ display: loadedVideoId ? 'block' : 'none' }}
          />
        </div>

        {/* Timestamp display */}
        {loadedVideoId && (
          <button
            type="button"
            onClick={() => onTimeCapture(playerRef.current?.getCurrentTime() ?? 0)}
            className="text-xs font-mono text-left transition-colors hover:opacity-80"
            style={{ color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            aria-label="Capture current timestamp"
          >
            ⏱ Click to capture current timestamp
          </button>
        )}
      </div>
    )
  }
)

VideoPane.displayName = 'VideoPane'
