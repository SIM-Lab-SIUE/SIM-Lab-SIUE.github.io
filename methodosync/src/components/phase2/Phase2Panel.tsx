import { useState } from 'react'
import { Plus, Trash2, AlertCircle } from 'lucide-react'
import { DropZone } from './DropZone'
import { PasteArea } from './PasteArea'
import { CodebookRowComponent } from './CodebookRowComponent'
import { ExportButton } from './ExportButton'
import { useAppStore } from '../../store/useAppStore'

interface Phase2PanelProps {
  headingRef: React.RefObject<HTMLHeadingElement | null>
}

export function Phase2Panel({ headingRef }: Phase2PanelProps) {
  const codebookRows = useAppStore((s) => s.codebookRows)
  const parsedFiles = useAppStore((s) => s.parsedFiles)
  const addCodebookRow = useAppStore((s) => s.addCodebookRow)
  const clearParsedFiles = useAppStore((s) => s.clearParsedFiles)

  const [showPaste, setShowPaste] = useState(false)

  const parseErrors = parsedFiles.filter((f) => f.parseError)

  return (
    <section aria-labelledby="phase2-heading">
      <h2
        id="phase2-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-display mb-1"
        style={{ color: 'var(--rose)', outline: 'none' }}
      >
        Phase 2 — Quantitative Codebook Builder
      </h2>
      <p className="text-sm mb-6" style={{ color: 'var(--ink-soft)' }}>
        Upload your populated synthesis template (from the Bridge) to auto-generate codebook variables. Define inclusion/exclusion rules, scales, and anchor examples, then export a formatted Excel spreadsheet.
      </p>

      {/* Ingestion section */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--rose)' }}>
            1. Ingest Markdown Data
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowPaste((v) => !v)}
              className="btn-secondary text-xs"
              aria-pressed={showPaste}
              aria-label={showPaste ? 'Hide paste area' : 'Show paste area for manual input'}
            >
              {showPaste ? 'Hide' : 'Paste text instead'}
            </button>
            {parsedFiles.length > 0 && (
              <button
                type="button"
                onClick={clearParsedFiles}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-colors"
                style={{ color: '#c0392b', background: 'rgba(220,53,69,0.08)' }}
                aria-label="Clear all parsed files and reset codebook"
              >
                <Trash2 size={12} aria-hidden="true" />
                Reset
              </button>
            )}
          </div>
        </div>

        {showPaste ? (
          <PasteArea />
        ) : (
          <DropZone />
        )}

        {/* Parse errors */}
        {parseErrors.length > 0 && (
          <div
            className="mt-4 p-4 rounded-lg"
            role="alert"
            style={{ background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.2)' }}
          >
            <p className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#c0392b' }}>
              <AlertCircle size={15} aria-hidden="true" />
              {parseErrors.length} file{parseErrors.length !== 1 ? 's' : ''} had parsing errors:
            </p>
            <ul className="text-xs space-y-1" style={{ color: 'var(--ink-soft)' }}>
              {parseErrors.map((f) => (
                <li key={f.filename}>
                  <strong className="font-mono">{f.filename}</strong>: {f.parseError}
                </li>
              ))}
            </ul>
            <p className="text-xs mt-2" style={{ color: 'var(--ink-soft)' }}>
              Ensure files begin with <code className="font-mono">---</code> on the first line and contain valid YAML frontmatter.
            </p>
          </div>
        )}
      </div>

      {/* Codebook builder */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--rose)' }}>
            2. Define Codebook Variables
          </h3>
          <button
            type="button"
            onClick={addCodebookRow}
            className="btn-primary text-xs"
            style={{ background: 'var(--rose)' }}
            aria-label="Add a new deductive codebook row"
          >
            <Plus size={14} aria-hidden="true" />
            Add Variable
          </button>
        </div>

        {codebookRows.length === 0 ? (
          <div
            className="text-center py-12 rounded-xl"
            style={{ background: 'var(--paper)', border: '2px dashed var(--stroke)' }}
          >
            <p className="text-sm mb-1" style={{ color: 'var(--ink-soft)' }}>
              No variables yet.
            </p>
            <p className="text-xs" style={{ color: 'var(--ink-soft)' }}>
              Upload a Markdown file above to auto-generate rows, or click "Add Variable" to start from scratch.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4" aria-label="Codebook variables">
            {codebookRows.map((row, i) => (
              <CodebookRowComponent key={row.id} row={row} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Export section */}
      {codebookRows.length > 0 && (
        <div
          className="p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: 'var(--rose-pale)', border: '1px solid rgba(196,92,138,0.25)' }}
        >
          <div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--rose)' }}>
              3. Export to Excel
            </h3>
            <p className="text-xs" style={{ color: 'var(--ink-soft)', maxWidth: '420px' }}>
              Generates a formatted <code className="font-mono">.xlsx</code> file with teal headers and alternating row colours. All processing occurs locally — no data leaves your browser.
            </p>
          </div>
          <ExportButton />
        </div>
      )}

      {/* Instructional callout */}
      <div
        className="mt-8 p-5 rounded-xl text-sm"
        style={{ background: 'var(--teal-light)', border: '1px solid rgba(13,115,119,0.2)' }}
      >
        <h4 className="font-semibold mb-2" style={{ color: 'var(--teal-dark)' }}>
          Inter-rater reliability
        </h4>
        <p style={{ color: 'var(--ink-soft)' }}>
          A rigorous codebook is the foundation of inter-rater reliability. Your inclusion/exclusion rules should be specific enough that two independent coders, reading only this codebook, would apply the same code to the same data. After completing your codebook, conduct a pilot coding session to calculate Cohen's kappa or Krippendorff's alpha.
        </p>
      </div>
    </section>
  )
}
