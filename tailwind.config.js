/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1e4a96",
          dark: "#122d5e",
          muted: "#B1B7C1",
        },
        ink: "#121619",
        paper: "#FFFFFF",
        surface: "#F4F5F7",
        border: "#E4E6EA",
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Merriweather", "Georgia", "serif"],
        serif: ["var(--font-serif)", "Merriweather", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
        read: "720px",
      },
    },
  },
  plugins: [],
};