import type { Config } from "tailwindcss";

// prettier-ignore

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      screens: {
        'sm': {'max':'640px'},
        'md': {'max':'768px'},
        'lg': {'max':'1024px'},
        'xl': {'max':'1280px'},
        '2xl': {'max':'1536px'},
      },
    extend: {
      colors: {
        primary: {
          50: "#556b95",
          100: "#4e6188",
          200: "#46587b",
          300: "#3f4f6e",
          400: "#384661",
          500: "#303c54",
          600: "#293347",
          700: "#212a3a",
          800: "#1a202d",
          900: "#131720",
          950: "#0b0e13",
        },
        secondary: {
          500: "#065ec0",
          600: "#0552a8",
        },
        accent: {
          500: "#181C28",
        },
      },
      keyframes: {
        slideIn: {
          from: {
            "max-height": "300px",
          },
          to: {
            "max-height": "0",
          },
        },
        slideOut: {
          from: {
            "max-height": "0",
          },
          to: {
            "max-height": "300px",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
