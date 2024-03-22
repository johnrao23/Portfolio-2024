/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-1": "spin1 2s infinite linear",
        "spin-2": "spin2 2s infinite linear",
        "spin-3": "spin3 2s infinite linear",
        blink: "blink 1s infinite",
      },
      keyframes: {
        spin1: {
          "0%, 100%": { transform: "rotateZ(20deg) rotateY(0deg)" },
          "100%": { transform: "rotateZ(100deg) rotateY(360deg)" },
        },
        spin2: {
          "0%, 100%": { transform: "rotateZ(100deg) rotateX(0deg)" },
          "100%": { transform: "rotateZ(0deg) rotateX(360deg)" },
        },
        spin3: {
          "0%, 100%": { transform: "rotateZ(100deg) rotateX(-360deg)" },
          "100%": { transform: "rotateZ(-360deg) rotateX(360deg)" },
        },
        blink: {
          "50%": { color: "transparent" },
        },
      },
      colors: {
        "spinner-yellow": "#fffc00",
      },
      zIndex: {
        spinner: "50",
      },
    },
  },
  plugins: [],
};
