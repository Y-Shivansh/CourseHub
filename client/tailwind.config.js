/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // toggle via class
  content: ["./index.html", "./src/**/*.{js,jsx}"], // Only scan these files for class names like bg-red-500 or dark:bg-black etc. and purge everything else.
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#54AD99",
          dark: "#60C3AD",  
          
        },
        secondary: {
          light: "#F6FBFA", // Prototype blue-gray — cards/sections bg (light mode)
          dark: "#1F2937",  // Slate blue-gray — cards/containers (dark mode)
        },
        background: {
          light: "#ffffff", // Pure white — page background (light mode)
          dark: "#14171c",  // Blackish — base background (dark mode)
        },
        text: {
          light: "#1C1C1C", // Charcoal black — headings/body (light mode)
          dark: "#F3F4F6",  // Soft white-gray — headings/body (dark mode)
          muted: "#64748B", // Cool gray — subtext, labels, hint text
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
