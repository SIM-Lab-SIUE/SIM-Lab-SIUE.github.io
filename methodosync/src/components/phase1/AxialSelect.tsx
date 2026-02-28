import { useState, useRef, useEffect } from 'react'
import type { KeyboardEvent } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'

interface AxialSelectProps {
  value: string
  onChange: (value: string) => void
}

export function AxialSelect({ value, onChange }: AxialSelectProps) {
  const categories = useAppStore((s) => s.axialCategories)
  const addAxialCategory = useAppStore((s) => s.addAxialCategory)

  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = categories.filter((c) =>
    c.toLowerCase().includes(filter.toLowerCase())
  )

  const showCreate =
    filter.trim() && !categories.some((c) => c.toLowerCase() === filter.trim().toLowerCase())

  function select(cat: string) {
    onChange(cat)
    setFilter('')
    setOpen(false)
  }

  function createNew() {
    const trimmed = filter.trim()
    if (!trimmed) return
    addAxialCategory(trimmed)
    select(trimmed)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') setOpen(false)
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered.length === 1) select(filtered[0])
      else if (showCreate) createNew()
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select axial category"
        onClick={() => { setOpen((o) => !o); setTimeout(() => inputRef.current?.focus(), 50) }}
        className="field-input flex items-center justify-between text-left w-full"
        style={{ minHeight: '42px' }}
      >
        <span className={value ? '' : 'text-gray-400'}>
          {value || 'Select or create a category…'}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className="shrink-0 ml-2 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--ink-soft)' }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Axial categories"
          className="absolute z-50 w-full mt-1 rounded-lg shadow-md overflow-hidden"
          style={{ background: 'var(--panel)', border: '1px solid var(--stroke)' }}
        >
          <div className="p-2" style={{ borderBottom: '1px solid var(--stroke)' }}>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or type new category…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-sm px-2.5 py-1.5 rounded outline-none"
              style={{ background: 'var(--paper)', border: '1px solid var(--stroke)', color: 'var(--ink)' }}
              aria-label="Filter or type new axial category"
            />
          </div>

          <ul className="max-h-48 overflow-y-auto py-1">
            {filtered.map((cat) => (
              <li
                key={cat}
                role="option"
                aria-selected={value === cat}
                onClick={() => select(cat)}
                className="px-3 py-2 text-sm cursor-pointer transition-colors"
                style={{
                  background: value === cat ? 'var(--teal-light)' : 'transparent',
                  color: value === cat ? 'var(--teal-dark)' : 'var(--ink)',
                }}
                onMouseEnter={(e) => {
                  if (value !== cat) (e.currentTarget as HTMLElement).style.background = 'var(--paper)'
                }}
                onMouseLeave={(e) => {
                  if (value !== cat) (e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                {cat}
              </li>
            ))}

            {showCreate && (
              <li
                role="option"
                aria-selected={false}
                aria-label={`Create new axial category: ${filter.trim()}`}
                onClick={createNew}
                className="px-3 py-2 text-sm cursor-pointer flex items-center gap-2 transition-colors"
                style={{ color: 'var(--teal)', borderTop: filtered.length ? '1px solid var(--stroke)' : 'none' }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'var(--teal-light)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'transparent')
                }
              >
                <Plus size={14} aria-hidden="true" />
                <span>Create "<strong>{filter.trim()}</strong>"</span>
              </li>
            )}

            {filtered.length === 0 && !showCreate && (
              <li className="px-3 py-2 text-sm" style={{ color: 'var(--ink-soft)' }}>
                No categories yet. Type to create one.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
