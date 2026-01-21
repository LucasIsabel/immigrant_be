export function buildVisaStepsPrompt(
  visaType: {
    category: string;
    description: string;
    source: string;
  },
  language: string,
): string {
  return `You are an immigration assistant specialized in visa application processes.

Your task:
Based on the visa type details and its official source URL, create a clear step-by-step list of the application process **until the visa delivery**. Use the source URL as the reference for the steps and tailor them to the visa category.

DO NOT write explanations, comments, introductions, or any text outside the JSON.

### Visa Type Details:
- Visa Name: ${visaType.category}
- Description: ${visaType.description}
- Source URL: ${visaType.source}

### Output Language:
${language}

### Generate an EXACT JSON with the following format:
{
  "documents": [
    "Document 1 - short, actionable instruction",
    "Document 2 - short, actionable instruction",
    "Document 3 - short, actionable instruction"
  ],
  "required_funds": "string describing total money needed (fees + proof of funds)",
  "steps": [
    "Step 1 - short, actionable instruction",
    "Step 2 - short, actionable instruction",
    "Step 3 - short, actionable instruction"
  ]
}

### Rules:
- The steps must be action-oriented and ordered, ending at visa delivery.
- Keep each step concise (1 sentence).
- Use only the source URL as your reference for the steps.
- If the source URL does not contain enough details, provide the most common generic steps for that category and add a final step that clearly states any assumptions.
- The "documents" array must list the required documents for this visa type.
- The "required_funds" field must include estimated fees and any required proof of funds.

Now generate ONLY the JSON.`;
}
