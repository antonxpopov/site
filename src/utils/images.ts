import type { ImageMetadata } from 'astro';

// All site photos live in src/assets/images so Astro can optimize them at build
// (AVIF/WebP, responsive srcset, intrinsic sizes). Content data still refers to
// them by the short path, e.g. '/images/projects/auricle/cover.jpg'.
const all = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp}',
  {
    eager: true,
  }
);

export function getAsset(path: string): ImageMetadata | undefined {
  return all[`/src/assets${path}`]?.default;
}
