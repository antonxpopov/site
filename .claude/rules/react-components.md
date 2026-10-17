---
paths:
  - "src/components/**/*.tsx"
  - "src/hooks/**/*.ts"
---

# React islands

- Types from `src/types/index.ts`; export props interfaces when reused.
- Use `useIntersectionObserver` for scroll-in animations instead of new IntersectionObserver copies.
- Audio: `AudioPlayer.tsx`; gallery: `ImageGallery.tsx`; external video: `VimeoPlayer.tsx`.
- Preserve accessibility: buttons for controls, alt text on images via `OptimizedImage` where applicable.
