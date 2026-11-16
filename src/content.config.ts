// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const progetti = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/progetti' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    cover: z.string(), // <-- Torna a stringa
    galleria: z.array(z.string()).optional(), // <-- Torna a stringa
    category: z.enum(['Travel', 'Portraits', 'Landscapes']),
    full_res: z.string().optional(),
  }),
});

export const collections = { progetti };