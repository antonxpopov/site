import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts: src/content/blog/<en|ru>/<slug>.md
const blog = defineCollection({
  loader: glob({ pattern: '{en,ru}/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    /** Image path like in the data files: /images/projects/popov_x_2025_01.jpg */
    cover: z.string().optional(),
    /** Slug of the related project, e.g. "auricle" — adds a link to it. */
    project: z.string().optional(),
    /** Drafts are visible only in `npm run dev`. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
