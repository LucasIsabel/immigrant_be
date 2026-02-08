import { z } from 'zod';

export const visaStepsSchema = z.object({
  documents: z.array(z.string().min(1)),
  required_funds: z.string().min(1),
  steps: z.array(z.string().min(1)),
});

export type VisaStepsType = z.infer<typeof visaStepsSchema>;
