import { useAppStore } from '../../store/useAppStore'

type Phase = 'phase1' | 'bridge' | 'phase2'

const TABS: { id: Phase; label: string; short: string; color: string }[] = [
  { id: 'phase1',  label: 'Phase 1 — Qualitative Annotator', short: 'Annotate',   color: '#0d7377' },
  { id: 'bridge',  label: 'Bridge — Template Download',        short: 'Bridge',    color: '#e8871a' },
  { id: 'phase2',  label: 'Phase 2 — Codebook Builder',        short: 'Codebook',  color: '#c45c8a' },
]

interface PhaseNavProps {
  panelRefs: Record<Phase, React.RefObject<HTMLHeadingElement | null>>
}

export function PhaseNav({ panelRefs }: PhaseNavProps) {
  const activePhase = useAppStore((s) => s.activePhase)
  const setActivePhase = useAppStore((s) => s.setActivePhase)

  function switchTo(phase: Phase) {
    setActivePhase(phase)
    // Move focus to the new panel heading for screen reader users
    setTimeout(() => {
      panelRefs[phase].current?.focus()
    }, 50)
  }

  return (
    <nav
      aria-label="Application phases"
      className="sticky top-0 z-40 border-b"
      style={{ background: 'rgba(249,247,244,0.95)', backdropFilter: 'blur(8px)', borderColor: 'var(--stroke)' }}
    >
      <div className="max-w-5xl mx-auto px-4 flex" role="tablist">
        {TABS.map((tab) => {
          const isActive = activePhase === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => switchTo(tab.id)}
              className="flex-1 py-3.5 text-xs md:text-sm font-medium tracking-wide transition-all relative"
              style={{
                color: isActive ? tab.color : 'var(--ink-soft)',
                borderBottom: isActive ? `3px solid ${tab.color}` : '3px solid transparent',
              }}
            >
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.short}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
