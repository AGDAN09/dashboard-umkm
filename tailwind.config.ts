import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        daun: { DEFAULT: "#0F4C45", dark: "#0A3631", soft: "#E3EEEB" },
        kunyit: { DEFAULT: "#E9A23B", soft: "#FBEFD8" },
        bata: { DEFAULT: "#B5442F", soft: "#F8E4DF" },
        kertas: "#F6F5F0",
        tinta: "#1C2623",
      },
      fontFamily: { sans: ["var(--font-jakarta)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
