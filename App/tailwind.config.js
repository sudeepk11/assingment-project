/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#394AAB",
        primaryDark:"#16328D",
        bgPurple:"#576AD4",
      }
    },
  },
  plugins: [],
}

