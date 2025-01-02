/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'page': '80rem',
      },
      fontFamily: {
        hind: ['Hind', 'serif'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}