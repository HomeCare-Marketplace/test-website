import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#F6F2EC",
        oat: "#EEE5D8",
        ink: "#2D2A26",
        cocoa: "#5B4A3A",
        stone: "#7B746A",
      },
      boxShadow: {
        card: "0 10px 30px rgba(17, 24, 39, 0.08)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "badge-pop": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "70%": { transform: "scale(1.15)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-up": "fade-in-up 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in-fast": "fade-in 250ms ease-out",
        "slide-down": "slide-down 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "badge-pop": "badge-pop 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
