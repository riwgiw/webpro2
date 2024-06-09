/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide': 'slide 16s linear infinite'
      },
      keyframes: {
        'slide': {
          '0%, 20%': {transform: 'translateX(0)' },
          '25%, 45%': {transform: 'translateX(-100%)' },
          '50%, 70%': {transform: 'translateX(-200%)' },
          '75%, 100%': {transform: 'translateX(-300%)' },
        }
      },
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}

