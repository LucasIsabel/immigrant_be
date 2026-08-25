import { PrismaClient } from '../../generated/prisma';

/**
 * Seeds the model chain of each scenario.
 *
 * Uses `create`-if-absent rather than a plain upsert on purpose: once an admin
 * edits a chain from the panel, re-running the seed must not undo that choice.
 * The seed establishes a starting point; the panel owns it afterwards.
 *
 * The same defaults exist in `libs/ai/src/model-config.service.ts` so a database
 * that was never seeded still works. Keep the two in step.
 */
const CHAINS = [
  {
    scenario: 'blog_writing_opinion',
    primaryModel: 'anthropic/claude-sonnet-5',
    fallbackModels: [
      'moonshotai/kimi-k2.5',
      'gemini-direct:gemini-2.5-flash-lite',
    ],
  },
  {
    scenario: 'blog_writing_standard',
    primaryModel: 'moonshotai/kimi-k2.5',
    fallbackModels: [
      'deepseek/deepseek-v4-pro',
      'gemini-direct:gemini-2.5-flash-lite',
    ],
  },
  {
    scenario: 'blog_translation',
    primaryModel: 'google/gemini-3.1-flash-lite',
    fallbackModels: [
      'deepseek/deepseek-v4-flash',
      'gemini-direct:gemini-2.5-flash-lite',
    ],
  },
  {
    // Mesma classe da tradução: tarefa mecânica e muito restrita, onde o
    // modelo escreve sobre fatos que já recebeu em vez de descobrir nada.
    scenario: 'place_writing',
    primaryModel: 'google/gemini-3.1-flash-lite',
    fallbackModels: [
      'deepseek/deepseek-v4-flash',
      'gemini-direct:gemini-2.5-flash-lite',
    ],
  },
  // The four API-app scenarios (#151). Primary is the exact model these paths
  // called directly before the router, so seeding changes no behaviour; the
  // `:free` tail is the zero-cost net for the day both paid providers are out.
  {
    scenario: 'quiz_suggestions',
    primaryModel: 'gemini-direct:gemini-2.5-flash-lite',
    fallbackModels: ['deepseek/deepseek-v4-flash', 'z-ai/glm-5.2:free'],
  },
  {
    scenario: 'visa_recommendation',
    primaryModel: 'gemini-direct:gemini-2.5-flash-lite',
    fallbackModels: ['deepseek/deepseek-v4-flash', 'z-ai/glm-5.2:free'],
  },
  {
    scenario: 'visa_steps_translation',
    primaryModel: 'gemini-direct:gemini-2.5-flash-lite',
    fallbackModels: ['deepseek/deepseek-v4-flash', 'z-ai/glm-5.2:free'],
  },
  {
    scenario: 'business_moderation',
    primaryModel: 'gemini-direct:gemini-2.5-flash-lite',
    fallbackModels: ['deepseek/deepseek-v4-flash', 'z-ai/glm-5.2:free'],
  },
  {
    scenario: 'blog_image',
    primaryModel: 'bytedance-seed/seedream-5-0-lite',
    fallbackModels: [
      'google/gemini-3.1-flash-image',
      'gemini-direct:gemini-2.5-flash-image',
    ],
  },
];

const prisma = new PrismaClient();

export async function seedAiModelConfigs() {
  let created = 0;

  for (const chain of CHAINS) {
    const existing = await prisma.aiModelConfig.findUnique({
      where: { scenario: chain.scenario },
    });

    if (existing) {
      continue;
    }

    await prisma.aiModelConfig.create({ data: chain });
    created += 1;
  }

  console.log(
    `[seed] ai model configs: ${created} created, ${CHAINS.length - created} already configured`,
  );
}
