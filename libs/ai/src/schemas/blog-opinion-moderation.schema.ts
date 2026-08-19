import { z } from 'zod';

export const blogOpinionModerationInputSchema = z.object({
  personaName: z.string(),
  editorialStance: z.string(),
  title: z.string(),
  content: z.string(),
  newsItems: z.string(),
});

export type BlogOpinionModerationInput = z.infer<
  typeof blogOpinionModerationInputSchema
>;

const moderationFlagSchema = z.object({
  category: z.enum([
    'group_harm',
    'fabricated_facts',
    'attack_on_people',
    'reads_as_news',
  ]),
  excerpt: z.string(),
  reason: z.string(),
});

export const blogOpinionModerationResultSchema = z.object({
  riskLevel: z.enum(['low', 'medium', 'high']),
  flags: z.array(moderationFlagSchema),
  summary: z.string(),
  recommendation: z.enum(['approve', 'review', 'reject']),
});

export type BlogOpinionModerationResult = z.infer<
  typeof blogOpinionModerationResultSchema
>;
