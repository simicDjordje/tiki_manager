/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./Screens/**/*.{js,jsx,ts,tsx}", "./Components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#f1f2ed',
        bgSecondary: '#ffffff',
        textPrimary: '#232323',
        textMid: '#6D6D60',
        textSecondary: '#babbb6',
        appColor: '#5F9EA0',
        appColorDark: '#00505b'
      },
    }
  },
  plugins: [],
}

