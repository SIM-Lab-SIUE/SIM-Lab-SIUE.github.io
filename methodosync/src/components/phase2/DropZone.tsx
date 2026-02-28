import { useRef, useState } from 'react'
import type { DragEvent, ChangeEvent } from 'react'
import { Upload, FileText } from 'lucide-react'
import { parseFileObject } from '../../lib/yamlParser'
import { useAppStore } from '../../store/useAppStore'

export function DropZone() {
  const addParsedFiles = useAppStore((s) => s.addParsedFiles)
  const initCodebookFromParsed = useAppStore((s) => s.initCodebookFromParsed)
  const announce = useAppStore((s) => s.announce)

  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function processFiles(files: FileList | File[]) {
    const mdFiles = Array.from(files).filter((f) => f.name.endsWith('.md'))
    if (mdFiles.length === 0) {
      setStatus('No .md files found. Please upload Markdown files.')
      return
    }

    setProcessing(true)
    setStatus(null)

    const parsed = await Promise.all(mdFiles.map(parseFileObject))
    const errors = parsed.filter((p) => p.parseError)
    const successes = parsed.filter((p) => !p.parseError)

    addParsedFiles(parsed)
    initCodebookFromParsed()

    let msg = `Processed ${successes.length} file${successes.length !== 1 ? 's' : ''}.`
    if (errors.length) {
      msg += ` ${errors.length} file${errors.length !== 1 ? 's' : ''} had errors (see below).`
    }
    setStatus(msg)
    announce(msg)
    setProcessing(false)
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    setDragging(true)
  }

  function handleDragLeave() {
    setDragging(false)
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files)
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) processFiles(e.target.files)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop Markdown files here or press Enter to browse for files"
        className="relative rounded-xl transition-all cursor-pointer"
        style={{
          border: `2px dashed ${dragging ? 'var(--rose)' : 'rgba(196,92,138,0.4)'}`,
          background: dragging ? 'var(--rose-pale)' : 'white',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".md"
          multiple
          onChange={handleFileChange}
          className="sr-only"
          aria-label="Upload Markdown files"
          tabIndex={-1}
        />

        <div className="flex flex-col items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'var(--rose-pale)', border: '1px solid rgba(196,92,138,0.3)' }}
          >
            {processing ? (
              <div className="w-5 h-5 rounded-full border-2 border-rose-300 border-t-transparent animate-spin" aria-hidden="true" />
            ) : (
              <Upload size={20} style={{ color: 'var(--rose)' }} aria-hidden="true" />
            )}
          </div>

          <div>
            <p className="font-medium text-sm" style={{ color: 'var(--ink)' }}>
              {processing ? 'Processing files…' : 'Drop .md files here'}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>
              or click to browse — accepts multiple files
            </p>
          </div>
        </div>
      </div>

      {status && (
        <p
          role="status"
          aria-live="polite"
          className="text-sm px-3 py-2 rounded-lg"
          style={{
            background: status.includes('error') || status.includes('Error')
              ? 'rgba(220,53,69,0.08)'
              : 'var(--teal-light)',
            color: status.includes('error') || status.includes('Error')
              ? '#c0392b'
              : 'var(--teal-dark)',
          }}
        >
          <FileText size={13} className="inline mr-1" aria-hidden="true" />
          {status}
        </p>
      )}
    </div>
  )
}
