import typographyPlugin from "@tailwindcss/typography";
import typographyStyles from "./typography";

export default {
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
    fontSize: {
      xs: ["0.8125rem", { lineHeight: "1.5rem" }],
      sm: ["0.875rem", { lineHeight: "1.5rem" }],
      base: ["1rem", { lineHeight: "1.75rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "2rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "3.5rem" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],
    },
  },
  plugins: [typographyPlugin(typographyStyles)],
};
