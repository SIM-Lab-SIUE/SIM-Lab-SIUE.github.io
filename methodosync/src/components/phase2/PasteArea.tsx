import { useState } from 'react'
import { Sparkles, AlertCircle } from 'lucide-react'
import { parseMDContent } from '../../lib/yamlParser'
import { useAppStore } from '../../store/useAppStore'

export function PasteArea() {
  const addParsedFiles = useAppStore((s) => s.addParsedFiles)
  const initCodebookFromParsed = useAppStore((s) => s.initCodebookFromParsed)
  const announce = useAppStore((s) => s.announce)

  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleParse() {
    setError(null)
    setSuccess(false)

    if (!text.trim()) {
      setError('Please paste your Markdown content above before parsing.')
      return
    }

    const result = parseMDContent('pasted-content.md', text)

    if (result.parseError) {
      setError(result.parseError)
      return
    }

    addParsedFiles([result])
    initCodebookFromParsed()
    setSuccess(true)
    announce('Markdown parsed. Codebook rows generated.')
    setText('')
  }

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="paste-area" className="field-label">
        Paste Markdown content
      </label>
      <textarea
        id="paste-area"
        rows={8}
        value={text}
        onChange={(e) => { setText(e.target.value); setError(null); setSuccess(false) }}
        placeholder={`Paste your populated synthesis template here. Example:\n\n---\nidentified_categories:\n  - violence_indicators\n  - gender_representation\noverarching_themes:\n  - power_dynamics\n---`}
        className="field-input font-mono text-xs resize-y"
        aria-describedby={error ? 'paste-error' : undefined}
      />

      {error && (
        <p id="paste-error" role="alert" className="flex items-start gap-2 text-sm" style={{ color: '#c0392b' }}>
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="text-sm" style={{ color: 'var(--teal-dark)' }}>
          Markdown parsed successfully. Scroll down to see the generated codebook rows.
        </p>
      )}

      <button
        type="button"
        onClick={handleParse}
        className="btn-primary self-start"
        style={{ background: 'var(--rose)' }}
        aria-label="Parse pasted Markdown and generate codebook rows"
      >
        <Sparkles size={15} aria-hidden="true" />
        Parse &amp; Generate Rows
      </button>
    </div>
  )
}
