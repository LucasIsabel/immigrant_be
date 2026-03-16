const LOCALE_LABELS: Record<string, string> = {
  pt: 'Brazilian Portuguese (PT-BR)',
  en: 'English',
  es: 'Spanish (Castilian)',
};

export interface VisaStepsTranslationPromptOptions {
  steps: Record<string, unknown>;
  sourceLanguage: string;
  targetLanguage: string;
}

export function buildVisaStepsTranslationPrompt(
  opts: VisaStepsTranslationPromptOptions,
): string {
  const targetLabel = LOCALE_LABELS[opts.targetLanguage] ?? opts.targetLanguage;
  const sourceLabel = LOCALE_LABELS[opts.sourceLanguage] ?? opts.sourceLanguage;

  const stepsJson = JSON.stringify(opts.steps, null, 2);

  return `
You are a professional translator specializing in immigration and visa content.

Translate the following visa steps JSON from **${sourceLabel}** to **${targetLabel}**.

## Rules
- Preserve the EXACT JSON structure: same keys, same nesting, same types (strings, numbers, booleans, arrays)
- Translate ONLY user-facing text: "name", "notes", "description", and any other human-readable string values
- Do NOT translate: theme/section keys (e.g. "documents", "financial"), field names, or program names (e.g. "Express Entry", "IRCC", "Schengen")
- Return a valid JSON object with the same structure as the input

## Source Content (JSON)
${stepsJson}

Return ONLY the translated JSON object. No markdown code fences, no explanations.
`.trim();
}
