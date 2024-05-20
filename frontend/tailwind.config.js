/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      "sm": "340px",
      "md": "620px",
      "lg": "1024px",
      "xl": "1208px"

    },
    extend: {
      fontFamily: {
        "farsi": ["persian", "monospace"],
        "ANSI": ["ANSI"]
      },

      // regular:"Akshar",
      // Url("./fonts/akshar.ttf"),
      // "Akshar":"Akshar"
    // }
  },
},
plugins: [],
}

