import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.string(),
    tags: z.array(z.string()),
    category: z.string(),
    image: z.string().optional(),
    description: z.string(),
  }),
});

export const collections = {
  'blog': blog,
};
