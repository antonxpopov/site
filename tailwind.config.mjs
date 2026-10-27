/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Source Code Pro', 'Monaco', 'Menlo', 'Courier New', 'monospace'],
      },
      colors: {
        bg: token('bg'),
        'bg-secondary': token('bg-secondary'),
        text: token('text'),
        'text-muted': token('text-muted'),
        border: token('border'),
        accent: token('text'),
      },
      maxWidth: {
        container: '1200px',
      },
      fontSize: {
        // Long-form reading text (project, about, teaching paragraphs)
        body: ['1.0625rem', { lineHeight: '1.75' }],
      },
    },
  },
  plugins: [],
};
