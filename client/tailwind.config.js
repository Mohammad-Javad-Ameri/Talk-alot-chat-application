/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
     extend: {
      screens: {
        '2xl': '400px',
        
      },
    },
  },
  plugins: [require("daisyui")],

}