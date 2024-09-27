import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    thumbnailImage: z.string(),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
    collections: z.array(z.string()).optional(),
    next: z
      .object({
        slug: z.string(),
        title: z.string(),
      })
      .optional(),
    previous: z
      .object({
        slug: z.string(),
        title: z.string(),
      })
      .optional(),
  }),
});

export const collections = { blog };
