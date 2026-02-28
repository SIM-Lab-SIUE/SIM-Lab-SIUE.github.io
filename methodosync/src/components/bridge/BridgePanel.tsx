import { Download, ArrowRight } from 'lucide-react'
import { downloadBlob } from '../../utils/downloadBlob'
import { useAppStore } from '../../store/useAppStore'

const TEMPLATE_CONTENT = `---
identified_categories:
  -
overarching_themes:
  -
analyst_notes: ""
---

## Synthesis Notes

<!--
  Instructions:
  1. Review your Phase 1 annotation files in your Obsidian vault.
  2. Use Obsidian's search or Dataview plugin to review all your open codes and axial categories.
  3. Decide which categories are significant enough for quantitative measurement.
  4. Add each finalized category name to the 'identified_categories' list above.
  5. Add broader theoretical themes to 'overarching_themes'.
  6. Upload this completed file in Phase 2 to auto-generate your codebook.
-->

### Categories Identified
<!-- List your finalized categories here with brief justifications -->

### Theoretical Connections
<!-- How do your categories relate to existing theory? -->

### Questions for Further Coding
<!-- What gaps remain? What requires more data? -->
`

interface BridgePanelProps {
  headingRef: React.RefObject<HTMLHeadingElement | null>
}

export function BridgePanel({ headingRef }: BridgePanelProps) {
  const setActivePhase = useAppStore((s) => s.setActivePhase)
  const announce = useAppStore((s) => s.announce)

  function handleDownload() {
    const blob = new Blob([TEMPLATE_CONTENT], { type: 'text/markdown;charset=utf-8' })
    downloadBlob(blob, 'methodosync-synthesis-template.md')
    announce('Synthesis template downloaded.')
  }

  return (
    <section aria-labelledby="bridge-heading">
      <h2
        id="bridge-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-display mb-1"
        style={{ color: '#c5760d', outline: 'none' }}
      >
        Bridge — Methodological Synthesis Template
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--ink-soft)' }}>
        Before building a quantitative codebook, you must synthesise your Phase 1 findings into a structured list of measurable variables. This template guides that process.
      </p>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            number: '01',
            color: 'var(--teal)',
            bg: 'var(--teal-light)',
            title: 'Review your vault',
            text: 'Open your Obsidian vault and review all Phase 1 annotation files. Use search or the Dataview plugin to see all your open codes and axial categories.',
          },
          {
            number: '02',
            color: 'var(--amber)',
            bg: 'var(--amber-pale)',
            title: 'Identify core variables',
            text: 'Through selective coding, decide which themes recur frequently enough to warrant quantitative measurement. These become your codebook variables.',
          },
          {
            number: '03',
            color: 'var(--rose)',
            bg: 'var(--rose-pale)',
            title: 'Populate the template',
            text: 'Download the template below, open it in Obsidian, and add your finalized category names to the YAML frontmatter arrays. Then upload it in Phase 2.',
          },
        ].map((step) => (
          <div
            key={step.number}
            className="card"
            style={{ borderLeft: `4px solid ${step.color}` }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3 font-mono"
              style={{ background: step.bg, color: step.color }}
            >
              {step.number}
            </div>
            <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--ink)' }}>
              {step.title}
            </h3>
            <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
              {step.text}
            </p>
          </div>
        ))}
      </div>

      {/* Download area */}
      <div
        className="p-6 rounded-2xl text-center"
        style={{ background: 'var(--amber-pale)', border: '1px solid rgba(232,135,26,0.3)' }}
      >
        <h3 className="font-display text-xl mb-2" style={{ color: 'var(--amber)' }}>
          Initial Markdown Template
        </h3>
        <p className="text-sm mb-5" style={{ color: 'var(--ink-soft)', maxWidth: '480px', margin: '0 auto 1.25rem' }}>
          A blank <code className="font-mono text-xs">.md</code> file with YAML frontmatter arrays ready to be populated with your synthesised categories.
        </p>
        <button
          onClick={handleDownload}
          className="btn-primary inline-flex"
          style={{ background: 'var(--amber)' }}
          aria-label="Download synthesis template Markdown file"
        >
          <Download size={16} aria-hidden="true" />
          Download Template
        </button>
      </div>

      {/* Template preview */}
      <div className="mt-6">
        <h4 className="field-label mb-2">Template Preview</h4>
        <pre
          className="rounded-xl overflow-x-auto p-4 text-xs font-mono leading-relaxed"
          style={{ background: '#0e1e2e', color: '#a8d8d8', maxHeight: '280px' }}
        >
          <code>{TEMPLATE_CONTENT}</code>
        </pre>
      </div>

      {/* Next step CTA */}
      <div
        className="mt-6 p-5 rounded-xl flex items-center justify-between gap-4"
        style={{ background: 'var(--teal-light)', border: '1px solid rgba(13,115,119,0.25)' }}
      >
        <div>
          <p className="font-semibold text-sm" style={{ color: 'var(--teal-dark)' }}>
            Ready for Phase 2?
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--ink-soft)' }}>
            Once you've populated the template, upload it in the Codebook Builder to auto-generate your variables.
          </p>
        </div>
        <button
          onClick={() => setActivePhase('phase2')}
          className="btn-primary shrink-0"
          aria-label="Go to Phase 2: Codebook Builder"
        >
          Phase 2
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
