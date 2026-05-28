/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0c0f0e',
        card: '#141918',
        'card-2': '#101413',
        accent: '#6ec8a9',
        'accent-2': '#8ee8c8',
        light: '#e0f0eb',
        muted: '#607a72',
        green: '#6eb88a',
        blue: '#7a9ec8',
        gold: '#c8b46e',
        red: '#d9735a',
        purple: '#a07ec8',
        orange: '#c8956e',
        border: '#1e2a25',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
