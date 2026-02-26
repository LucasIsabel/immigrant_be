import { z } from 'zod';

export const blogPostAiSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  suggested_tags: z.array(z.string()).optional().default([]),
});

export type BlogPostAiResponse = z.infer<typeof blogPostAiSchema>;
