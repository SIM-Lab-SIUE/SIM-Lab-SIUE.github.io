export function AppHeader() {
  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #0d7377 0%, #085a5e 60%, #1a1a2e 100%)',
      }}
      className="w-full pt-14 pb-10 px-6 text-center relative overflow-hidden"
    >
      {/* Decorative pattern overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(232,135,26,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196,92,138,0.3) 0%, transparent 40%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Lab badge */}
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase mb-4"
          style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
        >
          SIM Lab @ SIUE
        </span>

        <h1
          className="font-display text-4xl md:text-5xl text-white mb-3 leading-tight"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          MethodoSync
        </h1>

        <p
          className="text-base md:text-lg max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          A mixed-methods pedagogical platform — from qualitative video annotation
          to quantitative codebook construction.
        </p>

        {/* Back link */}
        <a
          href="/index.html"
          className="inline-flex items-center gap-1.5 mt-5 text-sm transition-colors"
          style={{ color: 'rgba(255,255,255,0.6)' }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = 'rgba(255,255,255,1)')
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.6)')
          }
        >
          ← SIM Lab Home
        </a>
      </div>
    </header>
  )
}
