import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-background': '#F5F7FA',
        'brand-surface': '#1E293B',
        'brand-primary': '#3E8BFF',
        'brand-primary-light': '#66A3FF',
        'brand-text-primary': '#FFFFFF',
        'brand-text-secondary': '#CBD5E1',
        'brand-border': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'gradient-pan': 'gradient-pan 3s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-pan': {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;