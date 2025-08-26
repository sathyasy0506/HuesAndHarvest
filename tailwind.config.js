/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sk-chase": {
          "100%": { transform: "rotate(360deg)" },
        },
        "sk-chase-dot": {
          "80%, 100%": { transform: "rotate(360deg)" },
        },
        "sk-chase-dot-before": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.4)" },
        },
        "bounce-smooth": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "sk-chase": "sk-chase 2.5s linear infinite",
        "sk-chase-dot": "sk-chase-dot 2s ease-in-out infinite",
        "sk-chase-dot-before": "sk-chase-dot-before 2s ease-in-out infinite",
        "bounce-smooth": "bounce-smooth 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
