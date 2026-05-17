/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:          'var(--bg)',
        surface:     'var(--surface)',
        chalk:       'var(--chalk)',
        text:        'var(--text)',
        'text-dark': 'var(--text-dark)',
        muted:       'var(--muted)',
        violet:      'var(--violet)',
        amber:       'var(--amber)',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'Fraunces', 'Georgia', 'serif'],
        sans:    ['"Instrument Sans Variable"', 'Instrument Sans', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        measure: '68ch',
        page:    '1180px',
      },
      letterSpacing: {
        display: '0.02em',
        ui:      '0.14em',
      },
    },
  },
  plugins: [],
};
