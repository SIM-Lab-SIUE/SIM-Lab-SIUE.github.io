import type { YTPlayer, YTPlayerEvent } from './annotation'

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string
          width?: number | string
          height?: number | string
          playerVars?: {
            autoplay?: 0 | 1
            modestbranding?: 0 | 1
            rel?: 0 | 1
            origin?: string
            controls?: 0 | 1
          }
          events?: {
            onReady?: (event: { target: YTPlayer }) => void
            onStateChange?: (event: YTPlayerEvent) => void
            onError?: (event: { data: number }) => void
          }
        }
      ) => YTPlayer
      PlayerState: {
        UNSTARTED: -1
        ENDED: 0
        PLAYING: 1
        PAUSED: 2
        BUFFERING: 3
        CUED: 5
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}
