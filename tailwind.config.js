/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          'InterVariable',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
        serif: [
          '"Iowan Old Style"',
          'Palatino',
          '"Palatino Linotype"',
          '"Book Antiqua"',
          'Georgia',
          'Cambria',
          'serif',
        ],
        mono: [
          '"IBM Plex Mono"',
          'ui-monospace',
          'SFMono-Regular',
          '"SF Mono"',
          'Menlo',
          'Consolas',
          '"Liberation Mono"',
          'monospace',
        ],
      },
      fontSize: {
        // Display sizes tuned for the serif's small x-height.
        display: ['clamp(1.817681rem, 5.089509vw, 2.908291rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        title: ['clamp(1.171395rem, 2.544754vw, 1.615717rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        label: ['0.580189rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        measure: '34rem',
        page: '72rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
