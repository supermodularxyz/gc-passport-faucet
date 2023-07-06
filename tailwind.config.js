const config = require("tailwindcss/defaultConfig");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        text: "#fff",
        primary: "#6935FF",
        secondary: "#02E2AC",
        border: "#4D5E80",
        background: "#202836",
        button: {
          dark: "#6935FF",
          light: "#fff",
        },
        disabled: "#786F95",
      },
      borderRadius: {
        DEFAULT: config.theme.borderRadius.full,
      },
    },
    fontFamily: {
      ...config.theme.fontFamily,
      sans: ["var(--font-sans)"],
      serif: ["var(--font-serif)"],
    },
  },
  plugins: [],
};
