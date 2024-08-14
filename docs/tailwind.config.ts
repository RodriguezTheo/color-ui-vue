import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  safelist: ["dark"],
  content: [
    "./components/**/*.{ts,tsx,vue}",
    "./.vitepress/**/*.{ts,tsx,vue}",
    "./.vitepress/components/**/*.{ts,tsx,vue}",
    "./.vitepress/components/*.{ts,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          active: "hsl(var(--primary-active))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },

        gradient: {
          1: "var(--gradient-1)",
          2: "var(--gradient-2)",
          3: "var(--gradient-3)",
          4: "var(--gradient-4)",
          5: "var(--gradient-5)",
          6: "var(--gradient-6)"
        }
      },
      backgroundImage: {
        "gradient-primary": "var(--linear-gradient)"
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 }
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: "var(--radix-collapsible-content-height)" }
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: 0 }
        },
        "code-down": {
          from: { height: "160px" },
          to: { height: "var(--code-content-height)" }
        },
        "code-up": {
          from: { height: "var(--code-content-height)" },
          to: { height: "160px" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
        "code-down": "code-down 0.3s ease-in-out",
        "code-up": "code-up 0.3s ease-in-out"
      }
    }
  },
  plugins: [animate]
};
