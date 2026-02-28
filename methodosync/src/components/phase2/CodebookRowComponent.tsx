import { Trash2, GripVertical } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import type { CodebookRow } from '../../types/annotation'

interface CodebookRowProps {
  row: CodebookRow
  index: number
}

export function CodebookRowComponent({ row, index }: CodebookRowProps) {
  const updateCodebookRow = useAppStore((s) => s.updateCodebookRow)
  const deleteCodebookRow = useAppStore((s) => s.deleteCodebookRow)

  function update(field: keyof CodebookRow, value: string) {
    updateCodebookRow(row.id, { [field]: value })
  }

  const borderColor = row.source === 'inductive' ? 'var(--teal)' : 'var(--rose)'
  const sourceBadge = row.source === 'inductive' ? 'Inductive' : 'Deductive'
  const badgeBg = row.source === 'inductive' ? 'var(--teal-light)' : 'var(--rose-pale)'
  const badgeColor = row.source === 'inductive' ? 'var(--teal-dark)' : 'var(--rose)'

  return (
    <div
      className="card"
      style={{ borderLeft: `4px solid ${borderColor}` }}
      aria-label={`Codebook row ${index + 1}: ${row.variableLabel || row.variableName || 'Untitled'}`}
    >
      {/* Row header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GripVertical size={16} style={{ color: 'var(--ink-soft)', opacity: 0.5 }} aria-hidden="true" />
          <span className="font-mono text-xs font-semibold" style={{ color: 'var(--ink-soft)' }}>
            #{String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: badgeBg, color: badgeColor }}
          >
            {sourceBadge}
          </span>
        </div>
        <button
          type="button"
          onClick={() => deleteCodebookRow(row.id)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-colors"
          style={{ color: '#c0392b', background: 'transparent' }}
          aria-label={`Delete row ${index + 1}: ${row.variableLabel || row.variableName}`}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(220,53,69,0.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <Trash2 size={13} aria-hidden="true" />
          Delete
        </button>
      </div>

      {/* 6-field grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Variable Name */}
        <div>
          <label htmlFor={`var-name-${row.id}`} className="field-label">
            Variable Name
            <span className="ml-1 font-light opacity-60 normal-case tracking-normal">
              — for SPSS/R (no spaces)
            </span>
          </label>
          <input
            id={`var-name-${row.id}`}
            type="text"
            value={row.variableName}
            onChange={(e) => update('variableName', e.target.value)}
            className="field-input font-mono"
            aria-describedby={`var-name-hint-${row.id}`}
            pattern="[a-z0-9_]+"
          />
          <p id={`var-name-hint-${row.id}`} className="text-xs mt-1" style={{ color: 'var(--ink-soft)' }}>
            Lowercase, underscores only. Auto-sanitized from your category name.
          </p>
        </div>

        {/* Variable Label */}
        <div>
          <label htmlFor={`var-label-${row.id}`} className="field-label">
            Variable Label
            <span className="ml-1 font-light opacity-60 normal-case tracking-normal">
              — human-readable name
            </span>
          </label>
          <input
            id={`var-label-${row.id}`}
            type="text"
            value={row.variableLabel}
            onChange={(e) => update('variableLabel', e.target.value)}
            placeholder="e.g., Implied Violence"
            className="field-input"
          />
        </div>

        {/* Definition */}
        <div className="md:col-span-2">
          <label htmlFor={`var-def-${row.id}`} className="field-label">
            Definition
            <span className="ml-1 font-light opacity-60 normal-case tracking-normal">
              — comprehensive description of what this variable measures
            </span>
          </label>
          <textarea
            id={`var-def-${row.id}`}
            rows={3}
            value={row.definitionText}
            onChange={(e) => update('definitionText', e.target.value)}
            placeholder="This variable measures the presence of…"
            className="field-input resize-y"
          />
        </div>

        {/* Inclusion rules */}
        <div>
          <label htmlFor={`var-inc-${row.id}`} className="field-label" style={{ color: 'var(--teal-dark)' }}>
            Coding Rules — Inclusion
          </label>
          <textarea
            id={`var-inc-${row.id}`}
            rows={4}
            value={row.inclusionRules}
            onChange={(e) => update('inclusionRules', e.target.value)}
            placeholder="Code as present when…"
            className="field-input resize-y"
          />
        </div>

        {/* Exclusion rules */}
        <div>
          <label htmlFor={`var-exc-${row.id}`} className="field-label" style={{ color: '#c0392b' }}>
            Coding Rules — Exclusion
          </label>
          <textarea
            id={`var-exc-${row.id}`}
            rows={4}
            value={row.exclusionRules}
            onChange={(e) => update('exclusionRules', e.target.value)}
            placeholder="Do NOT code as present when…"
            className="field-input resize-y"
          />
        </div>

        {/* Values/Scale */}
        <div>
          <label htmlFor={`var-val-${row.id}`} className="field-label">
            Values / Scale
          </label>
          <input
            id={`var-val-${row.id}`}
            type="text"
            value={row.valuesScale}
            onChange={(e) => update('valuesScale', e.target.value)}
            placeholder="0 = Absent, 1 = Present, -99 = Missing"
            className="field-input font-mono text-xs"
          />
        </div>

        {/* Anchor example */}
        <div>
          <label htmlFor={`var-anc-${row.id}`} className="field-label">
            Anchor Example
          </label>
          <textarea
            id={`var-anc-${row.id}`}
            rows={3}
            value={row.anchorExample}
            onChange={(e) => update('anchorExample', e.target.value)}
            placeholder="Verbatim quote or timestamp description that exemplifies this code…"
            className="field-input resize-y text-xs"
          />
        </div>
      </div>
    </div>
  )
}
