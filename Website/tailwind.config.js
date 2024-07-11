/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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