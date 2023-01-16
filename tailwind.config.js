/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,jsx}"],
  theme: {
    extend: {
      scale: {
        "101": "1.01"
      },
      minHeight: {
        "32": "32px"
      }
    },
    screens: {
      sm: "640px",

      md: "1024px",

      lg: "1280px",
    },
  },
  plugins: [],
};
