/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
      },
      colors: {
        headline: "#00214d",
        paragraf: "#1b2d45",
        button: "#ff004c",
        stroke: "#00214d",
      },
      screens: {
        "2xl": " 1320px",
        xsm: "440px",
      },
      width: {
        "10/16": "796px",
        "6/16": "491px",
      },
    },
  },
  plugins: [],
};
