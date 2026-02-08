import { z } from 'zod';

export const visaRecommendationSchema = z.object({
  recommended_visa_type_id: z.string().uuid(),
  explanations: z.string(),
});

export type VisaRecommendationType = z.infer<typeof visaRecommendationSchema>;
