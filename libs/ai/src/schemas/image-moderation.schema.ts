import { z } from 'zod';

/**
 * One picture's verdict.
 *
 * `index` rather than the URL: the URL is an R2 key the model has no reason
 * to echo back correctly, and the caller already knows which position it
 * sent. Asking for the index makes a wrong answer obvious instead of
 * plausible.
 */
const imageFindingSchema = z.object({
  index: z.number().int().min(0),
  category: z.enum([
    'pornography',
    'nudity',
    'violence',
    'illegal',
    'unrelated',
  ]),
  reason: z.string(),
});

export const imageModerationResultSchema = z.object({
  riskLevel: z.enum(['low', 'medium', 'high']),
  findings: z.array(imageFindingSchema),
  summary: z.string(),
});

export type ImageModerationResult = z.infer<typeof imageModerationResultSchema>;
