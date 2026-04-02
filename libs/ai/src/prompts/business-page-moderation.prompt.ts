import type { BusinessPageModerationInput } from '../schemas/business-page-moderation.schema';

export function buildBusinessPageModerationPrompt(
  input: BusinessPageModerationInput,
): string {
  const contentJson = JSON.stringify(input, null, 2);

  return `
You are a professional content moderator for a business directory platform focused on immigration services.

Analyze the following business page content and check for:
1. **Pornographic content** — explicit sexual imagery descriptions, adult-only services
2. **Obscene language** — profanity, slurs, hate speech, discriminatory language
3. **Adult content links** — URLs leading to pornographic, gambling, or other adult websites
4. **Off-platform standards** — content unrelated to the business category, spam, scam indicators, misleading claims, or illegal services
5. **Contact information abuse** — phone numbers or emails that appear fraudulent or are associated with known scam patterns

## Content to Analyze
${contentJson}

## Rules
- Analyze ALL text fields: name, description, address, website, email, phone, whatsapp
- Flag each issue found with a specific category and the problematic text
- Provide a risk level: "low" (no issues), "medium" (minor concerns), "high" (clear violations)
- Be thorough but avoid false positives — legitimate business content should pass
- Consider the business type context when evaluating content appropriateness
- If website URLs are present, flag any that appear to lead to adult content domains

## Response Format
Return a valid JSON object matching this structure:
{
  "riskLevel": "low" | "medium" | "high",
  "flags": [
    {
      "category": "pornography" | "obscene_language" | "adult_links" | "off_platform" | "contact_abuse",
      "field": "the field name where the issue was found",
      "excerpt": "the problematic text excerpt",
      "reason": "brief explanation of why this was flagged"
    }
  ],
  "summary": "A concise summary of the moderation analysis in Portuguese (pt-BR)",
  "recommendation": "approve" | "review" | "reject"
}

Return ONLY the JSON object. No markdown code fences.
`.trim();
}
