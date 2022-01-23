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
      yellow: colors.yellow,
      pink: colors.pink,
      fuchsia: colors.fuchsia,
      orange: colors.orange,
      'transparent': 'transparent',
      // 'red': '#DB2438',
      'red': '#800a18',
      // 'gold': '#f5ba31',
      'gold': '#ffd700',
      'black': '#191A19',
      'gray': '#a1a1aa',
      'white': '#FFFFFF',
      'offWhite': '#e0e0e0'
    },
    fontFamily: {
      'body': 'Roboto, sans-serif'
    },
    extend: {},
  },
  plugins: [],
}