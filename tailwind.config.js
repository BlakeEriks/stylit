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
      green: colors.green,
      grey: colors.gray,
      'transparent': 'transparent',
      'red': '#DB2438',
      'gold': '#f5ba31',
      'black': '#191A19',
      'gray': '#a1a1aa',
      'white': '#FFFFFF',
      'offWhite': '#F2EDED'
    },
    fontFamily: {
      'body': 'Roboto, sans-serif'
    },
    extend: {},
  },
  plugins: [],
}