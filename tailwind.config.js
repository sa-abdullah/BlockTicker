/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      'sm': '0.75rem',   // smaller text
      'base': '0.85rem', // smaller default
      'lg': '1rem',      // smaller large text
      'xl': '1.25rem',
    },
  },
  plugins: [],
}


