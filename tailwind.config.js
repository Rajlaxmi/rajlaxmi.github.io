/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
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
        display: ['clamp(2.703937rem, 7.571025vw, 4.3263rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        title: ['clamp(1.742537rem, 3.785512vw, 2.4035rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        label: ['0.863075rem', { lineHeight: '1', letterSpacing: '0.18em' }],
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
