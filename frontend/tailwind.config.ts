import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { background: "#09090B", card: "#101014", accent: "#7c3aed" },
      boxShadow: { glow: "0 0 40px rgba(124,58,237,0.35)" }
    }
  },
  plugins: []
} satisfies Config;
