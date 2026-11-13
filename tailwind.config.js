/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0157FF",
          ink: "#121619",
          muted: "#B1B7C1",
        },
        paper: "#FFFFFF",
        surface: "#F4F5F7",
        border: "#E4E6EA",
      },
      fontFamily: {
        display: ["Playfair Display", "Merriweather", "Georgia", "serif"],
        serif: ["Merriweather", "Georgia", "serif"],
        sans: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
        read: "720px",
      },
    },
  },
  plugins: [],
};