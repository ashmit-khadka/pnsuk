/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themePrimary: '#285F9E', // Replace with your desired color value
        themeDark: '#002A59', // Replace with your desired color value
        themeLight: '#A6CFFF', // Replace with your desired color value
        themeAltLight: '#F6DFDF', // Replace with your desired color value
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
      },
      width: {
        'page': '80rem',
      },
      maxWidth: {
        'page': '80rem', // Custom max-width value (e.g., 1152px)
      },
      fontFamily: {
        hind: ['Hind', 'serif'],
        lora: ['Lora', 'serif'],
        satisfy: ['Satisfy', 'serif'],
      },
    },
  },
  plugins: [],
}