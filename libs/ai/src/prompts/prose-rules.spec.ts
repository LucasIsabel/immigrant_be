import { buildBestVisaTypePrompt } from './best-visa-type.prompt';
import { buildBlogPostPrompt } from './blog-post.prompt';
import { buildBlogTranslationPrompt } from './blog-translation.prompt';
import {
  HUMAN_WRITING_INSTRUCTION,
  NO_AI_TELLS_RULE,
  NO_DASH_RULE,
} from './prose-rules';
import { buildVisaStepsTranslationPrompt } from './visa-steps-translation.prompt';

const blogPostPrompt = buildBlogPostPrompt({
  countryName: 'Portugal',
  newsItems: [
    {
      title: 'Portugal updates D7 income thresholds',
      link: 'https://example.com/d7',
    },
  ],
});

const blogTranslationPrompt = buildBlogTranslationPrompt({
  targetLocale: 'pt',
  originalLocale: 'en',
  title: 'T',
  excerpt: 'E',
  content: 'C',
});

const bestVisaTypePrompt = buildBestVisaTypePrompt(
  { profession: 'Developer' },
  [
    {
      id: 'b7c1a6ee-0000-4000-8000-000000000000',
      category: 'Work Visa',
      description: 'For skilled workers',
      source: 'https://example.com',
    },
  ],
  'pt',
);

const visaStepsTranslationPrompt = buildVisaStepsTranslationPrompt({
  steps: { documents: [{ name: 'Passport' }] },
  sourceLanguage: 'en',
  targetLanguage: 'pt',
});

describe('prose rules nos prompts', () => {
  it.each([
    ['blog-post', blogPostPrompt],
    ['blog-translation', blogTranslationPrompt],
    ['best-visa-type', bestVisaTypePrompt],
    ['visa-steps-translation', visaStepsTranslationPrompt],
  ])('%s proíbe o travessão', (_name, prompt) => {
    expect(prompt).toContain(NO_DASH_RULE);
  });

  it('blog-post carrega o bloco completo, na ordem histórica', () => {
    // A extração para prose-rules.ts tem de ser invisível: o prompt gerado é
    // o mesmo de antes, byte a byte. Se esta assertiva quebrar, o prompt de
    // produção mudou — e isso precisa ser uma decisão, não um acidente de
    // refatoração.
    expect(blogPostPrompt).toContain(HUMAN_WRITING_INSTRUCTION);
  });

  it('best-visa-type também bloqueia os clichês de LLM', () => {
    expect(bestVisaTypePrompt).toContain(NO_AI_TELLS_RULE);
  });

  it.each([
    ['blog-translation', blogTranslationPrompt],
    ['visa-steps-translation', visaStepsTranslationPrompt],
  ])('%s NÃO carrega a blocklist de clichês', (_name, prompt) => {
    // Deliberado, não esquecimento: mandar um tradutor evitar "moreover" o
    // faria desviar do original, que é exatamente o que tradução não pode
    // fazer. A regra de estilo de uma tradução é fidelidade à fonte.
    expect(prompt).not.toContain(NO_AI_TELLS_RULE);
  });
});
