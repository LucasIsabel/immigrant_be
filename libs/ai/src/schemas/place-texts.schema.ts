import { z } from 'zod';

const localeTexts = z.object({
  /**
   * Uma ou duas frases sobre o lugar. O mínimo existe para o modelo não
   * devolver "Um museu." e o máximo para o texto caber no card sem virar
   * artigo — o card corta em três linhas.
   */
  description: z.string().min(80).max(400),
  /**
   * Dica prática de quem já foi. Nula quando os fatos não sustentam nenhuma:
   * inventar "chegue cedo" para um bairro seria exatamente o que este pipeline
   * existe para não fazer.
   */
  tip: z.string().max(200).nullable(),
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
