import { useRef } from 'react'
import { VideoPane } from './VideoPane'
import { AnnotationForm } from './AnnotationForm'
import { AnnotationOutput } from './AnnotationOutput'
import { useAppStore } from '../../store/useAppStore'
import type { VideoPaneHandle } from './VideoPane'

interface Phase1PanelProps {
  headingRef: React.RefObject<HTMLHeadingElement | null>
}

export function Phase1Panel({ headingRef }: Phase1PanelProps) {
  const playerRef = useRef<VideoPaneHandle>(null)
  const captureTimestamp = useAppStore((s) => s.captureTimestamp)
  const savedAnnotations = useAppStore((s) => s.savedAnnotations)

  return (
    <section aria-labelledby="phase1-heading">
      <h2
        id="phase1-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-display mb-1"
        style={{ color: 'var(--teal-dark)', outline: 'none' }}
      >
        Phase 1 — Qualitative Video Annotator
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--ink-soft)' }}>
        Load a YouTube video, then annotate specific moments using open coding, axial categorisation, and analytical memos. Each saved annotation exports as an Obsidian-compatible Markdown file.
      </p>

      {/* Dual-pane layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video pane */}
        <div className="card flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--teal)' }}>
            Video Player
          </h3>
          <VideoPane
            ref={playerRef}
            onTimeCapture={captureTimestamp}
          />
        </div>

        {/* Annotation form pane */}
        <div className="card flex flex-col gap-4 overflow-y-auto" style={{ maxHeight: '75vh' }}>
          <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--teal)' }}>
            Annotation Form
          </h3>
          <AnnotationForm playerRef={playerRef} />
        </div>
      </div>

      {/* Annotation output */}
      <div className="mt-6 flex flex-col gap-4">
        {savedAnnotations.length > 0 && (
          <div
            className="text-sm px-4 py-2 rounded-lg inline-flex items-center gap-2"
            style={{ background: 'var(--teal-light)', color: 'var(--teal-dark)' }}
            aria-live="polite"
          >
            <strong>{savedAnnotations.length}</strong> annotation{savedAnnotations.length !== 1 ? 's' : ''} saved this session
          </div>
        )}
        <AnnotationOutput />
      </div>

      {/* Instructional note */}
      <div
        className="mt-8 p-5 rounded-xl text-sm"
        style={{ background: 'var(--amber-pale)', border: '1px solid rgba(232,135,26,0.25)' }}
      >
        <h4 className="font-semibold mb-2" style={{ color: 'var(--amber)' }}>
          Next step: Building your Obsidian vault
        </h4>
        <p style={{ color: 'var(--ink-soft)' }}>
          Download each annotation as a <code className="font-mono text-xs">.md</code> file and drag it into your Obsidian vault. Once you have coded several video segments, use the <strong>Bridge</strong> tab to download a synthesis template, then move to <strong>Phase 2</strong> to build your quantitative codebook.
        </p>
      </div>
    </section>
  )
}
