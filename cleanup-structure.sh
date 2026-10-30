#!/bin/bash
# Removes files superseded by the new multi-page structure.
cd "$(dirname "$0")" || exit 1
rm -f src/components/HamburgerMenu.tsx src/components/Hero.tsx src/components/About.tsx \
  src/components/Contacts.tsx src/components/Portfolio.astro src/components/PortfolioCard.tsx \
  src/components/Performances.astro src/components/Lectures.astro src/components/Writing.astro \
  src/components/ScrollToTop.tsx src/data/writing.ts
rm -rf src/pages/project
echo "Done. Old section components and /project/[id] page removed."
rm -f src/components/PortfolioCard.optimized.example.tsx
echo "Also removed the unused example component."
# --- sections renamed: Works → Projects, Education → Teaching
rm -rf src/pages/works src/pages/ru/works src/pages/education src/pages/ru/education
rm -f src/views/WorksIndexView.astro src/views/EducationView.astro src/views/WorkView.astro
echo "Old Works/Education pages and views removed."
# --- photos moved to src/assets (optimized pipeline); old copies, unused helpers
rm -rf public/images
rm -f src/utils/imageSize.ts src/components/ImageGallery.tsx
echo "Old public/images and unused image helpers removed."
