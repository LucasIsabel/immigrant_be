import { z } from 'zod';

export const businessPageModerationInputSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  coverPhotoUrl: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  businessType: z.string().optional(),
  /** Flattened `typeData`, keyed by its JSON path inside the page content. */
  typeDataText: z.record(z.string(), z.string()).optional(),
  /** URLs found in `typeData`, keyed the same way. */
  typeDataLinks: z.record(z.string(), z.string()).optional(),
});

export type BusinessPageModerationInput = z.infer<
  typeof businessPageModerationInputSchema
>;

const moderationFlagSchema = z.object({
  category: z.enum([
    'pornography',
    'obscene_language',
    'adult_links',
    'off_platform',
    'contact_abuse',
  ]),
  field: z.string(),
  excerpt: z.string(),
  reason: z.string(),
});

export const businessPageModerationResultSchema = z.object({
  riskLevel: z.enum(['low', 'medium', 'high']),
  flags: z.array(moderationFlagSchema),
  summary: z.string(),
  recommendation: z.enum(['approve', 'review', 'reject']),
});

export type BusinessPageModerationResult = z.infer<
  typeof businessPageModerationResultSchema
>;
