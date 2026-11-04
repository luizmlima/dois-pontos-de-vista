import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const livros = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/livros' }),
  schema: z.object({
    titulo: z.string().min(1),
    autor: z.string().min(1),
    genero: z.string().min(1),
    ano: z.number().int().min(1),
    sinopse: z.string().min(1),
    cor: z.string().default('#53675A'),
    iniciais: z.string().optional(),
    capa: z.string().optional(),
    planejadoEle: z.boolean().default(false),
    planejadoEla: z.boolean().default(false),
    publicado: z.boolean().default(false),
    demonstrativo: z.boolean().default(false),
  }),
});
const dataIso = z.union([z.string(), z.date()]).transform((v) =>
  v instanceof Date ? v.toISOString().slice(0, 10) : v
).pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/));

const opinioes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/opinioes' }),
  schema: z.object({
    livro: z.string().min(1),
    pessoa: z.enum(['ele','ela']),
    titulo: z.string().min(1),
    nota: z.number().min(0).max(5).nullable().optional(),
    dataLeitura: dataIso,
    dataPublicacao: dataIso,
    resumo: z.string().min(1),
    publicado: z.boolean().default(false),
    demonstrativo: z.boolean().default(false),
  }),
});
export const collections = { livros, opinioes };
