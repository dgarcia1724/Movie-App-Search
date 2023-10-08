/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "330px",
        md: "580px",
        lg: "730px",
        xl: "730px",
        "2xl": "730px",
      },
      colors: {
        // Light Mode
        blue: "#0079FF",
        lightModeGray: "#697C9A",
        lightModeBlueGray: "#4B6A9B",
        lightModeBlack: "#2B3442",
        lightModeOffWhite: "#F6F8FF",
        lightModeWhite: "#FEFEFE",
        // Dark Mode
        darkModeWhite: "#FFFFFF",
        darkModeBlack: "#141D2F",
        darkModeNavy: "#1E2A47",
      },
    },
  },
  plugins: [],
};
