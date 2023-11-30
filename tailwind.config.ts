import type { Config } from "tailwindcss";

import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // wiggle: {
        //   "0%, 100%": { transform: "rotate(-20deg)" },
        //   "50%": { transform: "rotate(20deg)" },
        // },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-20deg)" },
          "50%": { transform: "rotate(20deg)" },
          "75%": { transform: "rotate(-20deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 700ms ease",
        wiggleinfinite: "wiggle 700ms ease infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
