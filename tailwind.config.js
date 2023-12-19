/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: { spinner: { '0%': { transform: 'rotate(180deg)' }, '100%': { transform: 'rotate(-180deg)' } } },
      animation: { spinner: 'spinner 0.6s linear infinite' },
    },
  },
  plugins: [],
}

