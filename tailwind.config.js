/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./public/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'black': '#403F3F',
        'deep-yellow': '#BF9A2C',
        'deep-yellow-accent': '#F2AE2E',
        'yellow': '#F2C12E',
        'yellow-accent': '#FECF27',
        'yellow-logo': '#FECF27',
        'white-accent': '#F8F8F8',
      }
    },
  },
  plugins: [],
}
