/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html"],
  theme: {
    container: {
      center: true,
      padding: "16px",
    },
    extend: {
      colors: {
        navbar: "#F5E6CA",
        button: "#2DCC70",
        card: "#6C757D",
        footer: "#D1D7DA",
        modal: "#DEFDFA",
      },
      height: {
        cardKoleksi: "420px",
        card: "480px",
      },
      width: {
        modal: "500px",
      },
    },
  },
  plugins: [],
};
