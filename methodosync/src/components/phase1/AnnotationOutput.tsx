import { useState } from 'react'
import { Copy, Check, Download } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { downloadBlob } from '../../utils/downloadBlob'

export function AnnotationOutput() {
  const markdown = useAppStore((s) => s.sessionMarkdown)
  const videoId = useAppStore((s) => s.videoId)
  const savedAnnotations = useAppStore((s) => s.savedAnnotations)
  const [copied, setCopied] = useState(false)

  if (!markdown) return null

  const filename = `${videoId ?? 'session'}-annotations.md`
  const count = savedAnnotations.length

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(markdown!)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable
    }
  }

  function handleDownload() {
    const blob = new Blob([markdown!], { type: 'text/markdown;charset=utf-8' })
    downloadBlob(blob, filename)
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--stroke)' }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          background: '#0e1e2e',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.45)' }}>
            {filename}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-mono"
            style={{ background: 'rgba(13,115,119,0.3)', color: '#4ecdc4' }}
          >
            {count} annotation{count !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors font-medium"
            aria-label={copied ? 'Copied to clipboard' : 'Copy all annotations to clipboard'}
            style={{
              background: copied ? 'rgba(13,115,119,0.3)' : 'rgba(255,255,255,0.08)',
              color: copied ? '#4ecdc4' : 'rgba(255,255,255,0.6)',
            }}
          >
            {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
            {copied ? 'Copied!' : 'Copy all'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors font-medium"
            aria-label={`Download all ${count} annotations as a single Markdown file`}
            style={{
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            <Download size={13} aria-hidden="true" />
            Download .md
          </button>
        </div>
      </div>

      {/* Combined session preview */}
      <pre
        className="overflow-x-auto p-4 text-xs font-mono leading-relaxed"
        style={{ background: '#0e1e2e', color: '#a8d8d8', margin: 0, maxHeight: '380px' }}
        aria-label="Combined annotation file preview"
      >
        <code>{markdown}</code>
      </pre>
    </div>
  )
}
