import { z, defineCollection } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.string().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
});

export const projectSchema = ({ image }) =>
  z.object({
    title: z.string(),
    description: z.string(),
    link: z.string().url().optional(),
    thumbnail: image().optional(),
    screenshots: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    order: z.number(),
  });

const blogCollection = defineCollection({
  type: "content",
  schema: blogSchema,
});
const projectsCollection = defineCollection({
  type: "content",
  schema: projectSchema,
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
