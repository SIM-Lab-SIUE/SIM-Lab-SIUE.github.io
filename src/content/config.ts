import { defineCollection, z } from 'astro:content';

const AREA = z.enum(['virtual-environments', 'streaming', 'methods', 'meetings']);

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    entries: z.array(z.object({
      title: z.string(),
      authors: z.array(z.string()).nonempty(),
      venue: z.string(),
      year: z.number().int().gte(2010).lte(2030),
      doi: z.string().url().optional(),
      preprint: z.string().url().optional(),
      status: z.enum(['published', 'in-press', 'preprint']),
      areas: z.array(AREA).nonempty(),
      featured: z.boolean().optional(),
    })),
  }),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    area: AREA,
    blurb: z.string().max(280),
    status: z.enum(['active', 'collecting', 'wrapping']),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).optional(),
  }),
});

const tools = defineCollection({
  type: 'data',
  schema: z.object({
    entries: z.array(z.object({
      name: z.string(),
      blurb: z.string(),
      href: z.string(),
      language: z.string(),
    })),
  }),
});

const people = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    titles: z.array(z.string()),
    bio: z.string(),
    headshot: z.string(),
    headshotAlt: z.string(),
    links: z.object({
      cv: z.string().url(),
      email: z.string().email(),
      orcid: z.string().url(),
      github: z.array(z.object({ label: z.string(), href: z.string().url() })),
      website: z.string().url(),
    }),
  }),
});

const researchAreas = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    blurb: z.string(),
    area: AREA,
  }),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    title: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  publications,
  projects,
  tools,
  people,
  'research-areas': researchAreas,
  news,
};
