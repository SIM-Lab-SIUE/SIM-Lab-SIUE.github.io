import { useState } from 'react'
import { Save, Clock } from 'lucide-react'
import { TokenInput } from './TokenInput'
import { AxialSelect } from './AxialSelect'
import { useAppStore } from '../../store/useAppStore'
import type { VideoPaneHandle } from './VideoPane'

interface AnnotationFormProps {
  playerRef: React.RefObject<VideoPaneHandle | null>
}

export function AnnotationForm({ playerRef }: AnnotationFormProps) {
  const draft = useAppStore((s) => s.draft)
  const updateDraft = useAppStore((s) => s.updateDraft)
  const capturedTimestamp = useAppStore((s) => s.capturedTimestamp)
  const captureTimestamp = useAppStore((s) => s.captureTimestamp)
  const saveAnnotation = useAppStore((s) => s.saveAnnotation)
  const videoId = useAppStore((s) => s.videoId)
  const clearDraft = useAppStore((s) => s.clearDraft)

  const [tokenInput, setTokenInput] = useState('')
  const [saved, setSaved] = useState(false)

  function captureNow() {
    const t = playerRef.current?.getCurrentTime() ?? 0
    captureTimestamp(t)
    playerRef.current?.pauseVideo()
  }

  function handleFieldFocus() {
    const t = playerRef.current?.getCurrentTime() ?? 0
    captureTimestamp(t)
  }

  function handleFieldKeyDown() {
    playerRef.current?.pauseVideo()
  }

  function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  function handleSave() {
    if (!videoId) return
    saveAnnotation()
    clearDraft()
    setTokenInput('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    playerRef.current?.playVideo()
  }

  const canSave = !!videoId && (draft.observationText || draft.openCodes.length > 0)

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); handleSave() }}
      className="flex flex-col gap-5"
      aria-label="Annotation form"
      noValidate
    >
      {/* Timestamp badge */}
      <div
        className="flex items-center justify-between p-3 rounded-lg"
        style={{ background: 'var(--teal-light)', border: '1px solid rgba(13,115,119,0.2)' }}
      >
        <div className="flex items-center gap-2">
          <Clock size={15} style={{ color: 'var(--teal)' }} aria-hidden="true" />
          <span className="text-sm font-medium" style={{ color: 'var(--teal-dark)' }}>
            Captured Timestamp:
          </span>
          <span
            className="font-mono text-sm font-semibold"
            style={{ color: 'var(--teal-dark)' }}
            aria-live="polite"
            aria-label={`Timestamp: ${formatTime(capturedTimestamp)}`}
          >
            {formatTime(capturedTimestamp)}
          </span>
        </div>
        <button
          type="button"
          onClick={captureNow}
          className="text-xs font-medium px-3 py-1 rounded-full transition-colors"
          style={{ background: 'var(--teal)', color: 'white' }}
          aria-label="Capture timestamp and pause video"
        >
          Capture Now
        </button>
      </div>

      {/* Observation */}
      <div>
        <label htmlFor="observation" className="field-label">
          Observation / Quote
          <span className="ml-1 font-light opacity-60 normal-case tracking-normal">
            — what do you see or hear? (in vivo coding)
          </span>
        </label>
        <textarea
          id="observation"
          rows={4}
          value={draft.observationText}
          onChange={(e) => updateDraft({ observationText: e.target.value })}
          onFocus={handleFieldFocus}
          onKeyDown={handleFieldKeyDown}
          placeholder="Describe what is happening at this moment in the video…"
          className="field-input resize-y"
          aria-describedby="observation-hint"
        />
        <p id="observation-hint" className="sr-only">
          This becomes a Markdown blockquote in the exported file.
        </p>
      </div>

      {/* Open codes */}
      <div>
        <label htmlFor="open-codes-input" className="field-label">
          Open Codes
          <span className="ml-1 font-light opacity-60 normal-case tracking-normal">
            — preliminary labels (open coding)
          </span>
        </label>
        <TokenInput
          id="open-codes-input"
          tags={draft.openCodes}
          onChange={(tags) => updateDraft({ openCodes: tags })}
          inputValue={tokenInput}
          onInputChange={setTokenInput}
        />
      </div>

      {/* Axial category */}
      <div>
        <div id="axial-label" className="field-label">
          Axial Category
          <span className="ml-1 font-light opacity-60 normal-case tracking-normal">
            — higher-level grouping (axial coding)
          </span>
        </div>
        <AxialSelect
          value={draft.axialCategory}
          onChange={(v) => updateDraft({ axialCategory: v })}
        />
      </div>

      {/* Analytical memo */}
      <div>
        <label htmlFor="memo" className="field-label">
          Analytical Memo
          <span className="ml-1 font-light opacity-60 normal-case tracking-normal">
            — your interpretations and theoretical notes
          </span>
        </label>
        <textarea
          id="memo"
          rows={5}
          value={draft.analyticalMemo}
          onChange={(e) => updateDraft({ analyticalMemo: e.target.value })}
          onFocus={handleFieldFocus}
          onKeyDown={handleFieldKeyDown}
          placeholder="What theoretical significance might this moment hold? What patterns are you noticing?"
          className="field-input resize-y"
        />
      </div>

      {/* Save button */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!canSave}
          className="btn-primary"
          aria-label="Save annotation as Markdown"
          style={{
            opacity: canSave ? 1 : 0.45,
            cursor: canSave ? 'pointer' : 'not-allowed',
          }}
        >
          <Save size={15} aria-hidden="true" />
          {saved ? 'Saved!' : 'Save Annotation'}
        </button>

        {!videoId && (
          <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>
            Load a video first to enable saving.
          </p>
        )}
      </div>
    </form>
  )
}
