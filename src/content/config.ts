import { z, defineCollection } from "astro:content";

const postCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    banner: z.string().optional(),
  }),
});

export const collections = {
  post: postCollection,
};
