/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0f0d',
        surface: '#121a16',
        surfaceLight: '#1e2a23',
        primary: '#00ff88',
        primaryDark: '#00cc6a',
        secondary: '#1e2d24',
        textMain: '#e0e0e0',
        textMuted: '#8a9e91',
        danger: '#ff4444',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
