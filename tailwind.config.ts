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
          50: "rgba(var(--primary-50))",
          100: "rgba(var(--primary-100))",
          200: "rgba(var(--primary-200))",
          300: "rgba(var(--primary-300))",
          400: "rgba(var(--primary-400))",
          500: "rgba(var(--primary-500))",
          600: "rgba(var(--primary-600))",
          700: "rgba(var(--primary-700))",
          800: "rgba(var(--primary-800))",
          900: "rgba(var(--primary-900))",
          950: "rgba(var(--primary-950))",
        },
        secondary: {
          500: "rgba(var(--secondary-500))",
          600: "rgba(var(--secondary-600))",
        },
        fontPrimary: {
          500: "rgba(var(--font-primary-500))",
          600: "rgba(var(--font-primary-600))",
          700: "rgba(var(--font-primary-700))",

        },
        accent: {
          500: "rgba(var(--accent-500))",
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
