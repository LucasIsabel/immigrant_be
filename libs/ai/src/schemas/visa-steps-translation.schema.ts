import { z } from 'zod';

/**
 * Flexible schema for translated visa steps.
 * Input is Record<string, unknown>; output preserves structure with translated strings.
 */
export const visaStepsTranslationAiSchema = z.record(z.string(), z.unknown());

export type VisaStepsTranslationAiResponse = z.infer<
  typeof visaStepsTranslationAiSchema
>;
