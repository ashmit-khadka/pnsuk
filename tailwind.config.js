/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'page': '92rem',
      },
      fontFamily: {
        hind: ['Hind', 'serif'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}