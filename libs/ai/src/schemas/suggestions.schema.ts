import { z } from 'zod';

export const suggestionsSchema = z.object({
  suggestions: z.array(
    z.object({
      /** Chave de busca: nome do país em inglês, copiado da lista do prompt. */
      country: z.string(),
      /** Nome do país no idioma da resposta, para exibir. */
      country_label: z.string().optional().default(''),
      compatibility: z.number(),
      reasons: z.array(z.string()),
      cities: z.array(z.string()),
      visa_options: z.array(z.string()),
      // Enriched from DB — Gemini does not return these
      country_background: z.string().optional().default(''),
      country_flag: z.string().optional().default(''),
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
