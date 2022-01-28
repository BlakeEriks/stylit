const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
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
      teal: colors.teal,
      purple: colors.purple,
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
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '900px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1320px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [],
}