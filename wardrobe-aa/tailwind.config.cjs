/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6B5E4F",   // deep olive-brown
          light: "#CBBFAD",     // beige
          dark: "#4B3E33",      // espresso
        },
        accent: {
          DEFAULT: "#8B8B6C",   // olive green
          light: "#B8B897",     // sage
          dark: "#5F6045",      // dark moss
        },
        danger: {
          DEFAULT: "#ef4444", // red for errors/alerts
        },
        neutral: {
            bg: "#F5F3EF",
            text: "#2E2A25",
            muted: "#D9D6D0",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
