import { z } from 'zod';

export const suggestionsSchema = z.object({
  suggestions: z.array(
    z.object({
      country: z.string(),
      compatibility: z.number(),
      reasons: z.array(z.string()),
      cities: z.array(z.string()),
      visa_options: z.array(z.string()),
      country_background: z.string(),
      country_flag: z.string(),
      investment_required: z.string(),
      average_visa_processing_time: z.string(),
      job_market: z.string(),
      education_quality: z.string(),
      difficulty: z.string(),
      health_care: z.string(),
      languages: z.array(z.string()),
    }),
  ),
});

export type SuggestionsType = z.infer<typeof suggestionsSchema>;
