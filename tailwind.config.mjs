/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Source Code Pro', 'Monaco', 'Menlo', 'Courier New', 'monospace'],
      },
      colors: {
        'bg': '#000000',
        'bg-secondary': '#1a1a1a',
        'text': '#f5f5f5',
        'text-muted': '#a0a0a0',
        'border': '#333333',
        'accent': '#f5f5f5',
      },
      maxWidth: {
        'container': '1000px',
      },
    },
  },
  plugins: [],
}

