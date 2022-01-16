const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      sky: colors.sky,
      rose: colors.rose,
      lime: colors.lime,
      'transparent': 'transparent',
      'red': '#DB2438',
      'gold': '#f5ba31',
      'black': '#191A19',
      'gray': '#a1a1aa',
      'white': '#FFFFFF',
      'offWhite': '#F2E8E8'
    },
    fontFamily: {
      'body': 'Roboto, sans-serif'
    },
    extend: {},
  },
  plugins: [],
}