/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}"],
  theme: {
    extend: {
      spacing: {
        144: '36rem',
        85: '21.25rem',
      }
    },
  },
  plugins: [],
}
