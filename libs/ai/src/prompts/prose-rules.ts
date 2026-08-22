/**
 * Regras de prosa humana, compartilhadas por todo prompt que gera texto lido
 * pelo usuário.
 *
 * Elas nasceram no prompt do blog e depois foram sendo recopiadas à mão — a
 * proibição do travessão chegou a existir em duas redações diferentes
 * (`blog-post` e `blog-translation`). Este módulo é a fonte única.
 *
 * São constantes separadas de propósito, porque nem toda regra cabe em todo
 * prompt:
 *
 * - `NO_DASH_RULE` vale em qualquer lugar, inclusive tradução.
 * - `NO_AI_TELLS_RULE` vale onde o modelo ESCREVE, não onde TRADUZ: mandar um
 *   tradutor evitar "moreover" o faria desviar do original, que é exatamente o
 *   que uma tradução não pode fazer.
 * - `JOURNALIST_VOICE_RULE` é voz editorial do blog; numa explicação de visto
 *   empurraria o texto para o registro errado.
 * - `HUMAN_CADENCE_RULE` cabe onde o modelo escreve prosa própria.
 *
 * Quem monta um prompt novo escolhe as regras que se aplicam, em vez de colar o
 * bloco inteiro ou redigir a sua própria versão.
 */

export const NO_DASH_RULE = `- **Punctuation**: Never use an em dash (—) or en dash (–) as a pause. Use a comma, a period, a colon, or parentheses. Numeric ranges use a hyphen (2019-2024).`;

export const JOURNALIST_VOICE_RULE = `- **Voice**: Write like a working journalist with a deadline, not like a language model. Mix short and long sentences. Prefer concrete nouns and named people, places, and programs from the news. One idea per paragraph is enough.`;

export const NO_AI_TELLS_RULE = `- **Avoid AI tells**: no "delve", "tapestry", "landscape of", "it's important to note", "in today's world", "moreover", "furthermore", "in conclusion", "not just X, but Y", "a double-edged sword", or three-item lists that all start the same way. Do not hedge every claim into symmetry. Do not open with a rhetorical question unless the news actually poses one.`;

export const HUMAN_CADENCE_RULE = `- **Cadence**: Occasional fragments are fine. Contractions are fine. Do not sound encyclopedic.`;

/**
 * O bloco completo que o prompt do blog sempre usou. A ordem das linhas é a
 * histórica — o teste de regressão compara o prompt gerado byte a byte, então
 * mudar a ordem aqui é mudar o prompt.
 */
export const HUMAN_WRITING_INSTRUCTION = [
  NO_DASH_RULE,
  JOURNALIST_VOICE_RULE,
  NO_AI_TELLS_RULE,
  HUMAN_CADENCE_RULE,
].join('\n');
