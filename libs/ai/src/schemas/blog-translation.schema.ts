import { z } from 'zod';

export const blogTranslationAiSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
});

export type BlogTranslationAiResponse = z.infer<typeof blogTranslationAiSchema>;
