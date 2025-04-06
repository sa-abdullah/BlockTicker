/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      'sm': '0.75rem',
      'base': '0.85rem',
      'lg': '1rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.125rem', 
      '5xl': '2.5rem',
    }
    
  },
  plugins: [],
}


