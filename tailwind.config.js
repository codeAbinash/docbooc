/** @type {import('tailwindcss').Config} */

const colors = require('./src/utils/colors')

// const accent = '#3377ee'

module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
}
