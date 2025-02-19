/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Extend the default Tailwind theme here
      colors: {
        primary: {
          main: "#1976d2",
          light: "#42a5f5",
          dark: "#1565c0",
        },
        secondary: {
          main: "#9c27b0",
          light: "#ba68c8",
          dark: "#7b1fa2",
        },
      },
    },
  },
  // Enable dark mode
  darkMode: "class",
  // Add plugins here
  plugins: [],
  // Important to avoid conflicts with MUI
  important: "#root",
};
