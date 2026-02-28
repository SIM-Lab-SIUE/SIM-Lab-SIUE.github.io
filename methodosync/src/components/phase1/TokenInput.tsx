import { useRef } from 'react'
import type { KeyboardEvent, ClipboardEvent } from 'react'
import { X } from 'lucide-react'

interface TokenInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  inputValue: string
  onInputChange: (value: string) => void
  id?: string
}

export function TokenInput({ tags, onChange, inputValue, onInputChange, id }: TokenInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  function commitTag(raw: string) {
    const trimmed = raw.trim().replace(/,+$/, '').trim()
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed])
    }
    onInputChange('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      commitTag(inputValue)
    } else if (e.key === 'Backspace' && inputValue === '') {
      onChange(tags.slice(0, -1))
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text')
    const newTags = pasted
      .split(/[,\n]+/)
      .map((t) => t.trim())
      .filter((t) => t && !tags.includes(t))
    if (newTags.length) {
      onChange([...tags, ...newTags])
    }
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag))
  }

  return (
    <div
      role="group"
      aria-label="Open codes"
      className="flex flex-wrap gap-1.5 p-2.5 rounded-lg min-h-[44px] cursor-text"
      style={{ border: '1.5px solid var(--stroke)', background: 'var(--paper)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span key={tag} className="pill-tag flex items-center gap-1">
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
            aria-label={`Remove open code: ${tag}`}
            className="hover:opacity-70 transition-opacity rounded-full p-0.5"
          >
            <X size={10} aria-hidden="true" />
          </button>
        </span>
      ))}

      <input
        ref={inputRef}
        id={id}
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onBlur={() => { if (inputValue.trim()) commitTag(inputValue) }}
        placeholder={tags.length === 0 ? 'Type a code, press Enter or comma…' : ''}
        aria-describedby="token-hint"
        className="flex-1 min-w-[140px] bg-transparent text-sm outline-none py-0.5"
        style={{ color: 'var(--ink)' }}
      />

      <p id="token-hint" className="sr-only">
        Press Enter or comma to add a code. Press Backspace on empty input to remove the last code.
      </p>
    </div>
  )
}
