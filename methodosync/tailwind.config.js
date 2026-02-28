/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:           '#1a1a2e',
        'ink-soft':    '#3d3d5c',
        teal:          '#0d7377',
        'teal-dark':   '#085a5e',
        'teal-light':  '#e8f4f5',
        amber:         '#e8871a',
        'amber-pale':  '#fff4e6',
        rose:          '#c45c8a',
        'rose-pale':   '#fdf0f6',
        paper:         '#f9f7f4',
        panel:         '#ffffff',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(26,26,46,0.08)',
        md: '0 8px 24px rgba(26,26,46,0.12)',
        lg: '0 20px 48px rgba(26,26,46,0.16)',
      },
    },
  },
  plugins: [],
}

