import type { Config } from "tailwindcss";
import flowbitePlugin from 'flowbite/plugin';

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lightPurple: "#AE85FF",
        darkPurple: "#6A1FFF",
        purple: "#8C52FF",
        white: "#FFFFFF",
        black: "#111111",
        darkGrey: "#2A2A2A",
      },
    },
  },
  plugins: [flowbitePlugin],
} satisfies Config;
