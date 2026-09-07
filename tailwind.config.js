/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* New design system */
        ink: '#111111',
        ivory: '#F3F1ED',
        gold: '#B59A62',
        'gold-soft': '#D4BB8A',
        'gold-warm': '#C9A45C',  /* kept for backward compat with existing inline colors */
        'gold-legacy': '#C8A96A', /* kept for admin pages using C8A96A */
        'ink-soft': '#1A1A1A',
        stone: '#D8D1C6',
        mist: '#F3F1ED',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.24em',
        luxe: '0.18em',
      },
      boxShadow: {
        luxe: '0 24px 60px rgba(10, 10, 10, 0.08)',
        card: '0 18px 48px rgba(10, 10, 10, 0.10)',
      },
    },
  },
  plugins: [],
};
