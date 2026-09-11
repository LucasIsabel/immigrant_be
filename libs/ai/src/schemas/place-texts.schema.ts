import { z } from 'zod';

/**
 * The limits the schema enforces — exported so the prompt can state them.
 *
 * They used to live only here, and the prompt asked for "one or two sentences"
 * without a number anywhere. A model obeying that can write 500 characters
 * about a place with a story, be entirely correct, and be rejected every single
 * time — which is the most likely reason one place failed nine attempts in a
 * row. A limit the writer is never told is a trap, not a rule.
 */
export const PLACE_TEXT_LIMITS = {
  descriptionMin: 80,
  descriptionMax: 400,
  tipMax: 200,
} as const;

const localeTexts = z.object({
  /**
   * Uma ou duas frases sobre o lugar. O mínimo existe para o modelo não
   * devolver "Um museu." e o máximo para o texto caber no card sem virar
   * artigo — o card corta em três linhas.
   */
  description: z
    .string()
    .min(PLACE_TEXT_LIMITS.descriptionMin)
    .max(PLACE_TEXT_LIMITS.descriptionMax),
  /**
   * Dica prática de quem já foi. Nula quando os fatos não sustentam nenhuma:
   * inventar "chegue cedo" para um bairro seria exatamente o que este pipeline
   * existe para não fazer.
   */
  tip: z.string().max(PLACE_TEXT_LIMITS.tipMax).nullable(),
});

/**
 * Uma chamada devolve os três idiomas.
 *
 * Separar em três chamadas triplicaria o custo e abriria espaço para as versões
 * divergirem — o modelo escrevendo "grátis" em português e "ticketed" em inglês
 * sobre o mesmo lugar.
 */
export const placeTextsAiSchema = z.object({
  pt: localeTexts,
  en: localeTexts,
  es: localeTexts,
});

export type PlaceTextsAiResponse = z.infer<typeof placeTextsAiSchema>;
