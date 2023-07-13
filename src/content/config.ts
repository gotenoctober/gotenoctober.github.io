import { z, defineCollection } from "astro:content";

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

const projectsCollection = defineCollection({
  type: "content",
  schema: projectSchema,
});

export const collections = {
  projects: projectsCollection,
};
