/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      maxWidth: {
        smaller: "2.5rem",
        smallish: "5rem",
      },
      spacing: {
        blob1: "65rem", // or however much you want
      },
      colors: {
        thegray: "#070707",
        myYellow: "#ffbe0b",
        myOrange: "#fb5607",
        myPink: "#ff006e",
        myPurple: "#8338ec",
        myBlue: "#3a86ff",
      },
      blur: {
        "4xl": "4rem", // 4rem = 64px
        "5xl": "6rem", // 5rem = 80px
      },
      fontFamily: {
        ArchivoBlack: ["Archivo Black", "system-ui", "sans-serif"],
        Archivo: ["Archivo", "system-ui", "sans-serif"],
        Mona: ["Mona-sans", "system-ui", "sans-serif"],
        Hublot: ["Hublot-sans", "system-ui", "sans-serif"],
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(15px, -25px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-10px, 10px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
