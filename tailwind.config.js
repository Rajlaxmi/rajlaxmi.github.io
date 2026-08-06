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
        serif: ['"EB Garamond Variable"', '"EB Garamond"', 'Georgia', 'Cambria', 'serif'],
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
        // Display sizes tuned for EB Garamond's small x-height.
        display: ['clamp(3.25rem, 11vw, 7rem)', { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        title: ['clamp(2rem, 5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
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
