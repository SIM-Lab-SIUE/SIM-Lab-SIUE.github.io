import { useRef } from 'react'
import { AppHeader } from './components/layout/AppHeader'
import { PhaseNav } from './components/layout/PhaseNav'
import { LiveRegion } from './components/layout/LiveRegion'
import { Phase1Panel } from './components/phase1/Phase1Panel'
import { BridgePanel } from './components/bridge/BridgePanel'
import { Phase2Panel } from './components/phase2/Phase2Panel'
import { useAppStore } from './store/useAppStore'

export default function App() {
  const activePhase = useAppStore((s) => s.activePhase)

  const phase1Ref = useRef<HTMLHeadingElement>(null)
  const bridgeRef = useRef<HTMLHeadingElement>(null)
  const phase2Ref = useRef<HTMLHeadingElement>(null)

  const panelRefs = { phase1: phase1Ref, bridge: bridgeRef, phase2: phase2Ref }

  return (
    <div className="min-h-screen flex flex-col">
      <LiveRegion />
      <AppHeader />
      <PhaseNav panelRefs={panelRefs} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <div
          id="panel-phase1"
          role="tabpanel"
          aria-labelledby="tab-phase1"
          hidden={activePhase !== 'phase1'}
        >
          <Phase1Panel headingRef={phase1Ref} />
        </div>

        <div
          id="panel-bridge"
          role="tabpanel"
          aria-labelledby="tab-bridge"
          hidden={activePhase !== 'bridge'}
        >
          <BridgePanel headingRef={bridgeRef} />
        </div>

        <div
          id="panel-phase2"
          role="tabpanel"
          aria-labelledby="tab-phase2"
          hidden={activePhase !== 'phase2'}
        >
          <Phase2Panel headingRef={phase2Ref} />
        </div>
      </main>

      <footer
        className="text-center py-6 text-xs"
        style={{ color: 'var(--ink-soft)', borderTop: '1px solid var(--stroke)' }}
      >
        MethodoSync · SIM Lab @ SIUE · All processing occurs locally in your browser — no data is sent to any server.
      </footer>
    </div>
  )
}
