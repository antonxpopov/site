/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Geologica', 'Source Code Pro', 'system-ui', 'sans-serif'],
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
        container: '1000px',
      },
      fontSize: {
        // Long-form reading text (project, about, teaching paragraphs).
        // 16px → 17px (max/min ratio ≈ 1.06, safe for zoom)
        body: ['clamp(1rem, 0.95rem + 0.15vw, 1.0625rem)', { lineHeight: '1.65' }],
      },
    },
  },
  plugins: [],
};
