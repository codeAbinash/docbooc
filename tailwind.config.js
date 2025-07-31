/** @type {import('tailwindcss').Config} */

// const accent = '#3377ee'
const accent = '#3b82f6'

module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        accent: accent,
        success: '#10B981',
        text: {
          DEFAULT: '#1e293b',
          dark: '#f8fafc',
        },
        gray: {
          DEFAULT: '#64748b',
          dark: '#94a3b8',
        },
        bg: {
          DEFAULT: '#f8fafc',
          dark: '#090b10',
        },
        card: {
          DEFAULT: '#e2e8f0',
          dark: '#1e293b',
        },
        line: {
          DEFAULT: '#cbd5e1',
          dark: '#334155',
        },
      },
    },
  },
  plugins: [],
}
