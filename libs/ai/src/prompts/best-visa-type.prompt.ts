export function buildBestVisaTypePrompt(
  userDetails: {
    profession?: string;
    country_origin?: string;
    plan_period?: string;
  },
  immigrationVisaTypes: Array<{
    id: string;
    category: string;
    description: string;
    source: string;
  }>,
  language: string,
): string {
  const userInfoText = `
- Profession: ${userDetails.profession || 'Not specified'}
- Continent of Origin: ${userDetails.country_origin || 'Not specified'}
- Plan Period: ${userDetails.plan_period || 'Not specified'}
`.trim();

  const visaTypesText = immigrationVisaTypes
    .map(
      (visa, index) => `
${index + 1}. Visa Type ID: ${visa.id}
   Category: ${visa.category}
   Description: ${visa.description}
   Source: ${visa.source}
`,
    )
    .join('\n');

  return `You are an expert immigration consultant specializing in visa type recommendations.

Your task:
Based on the user's information and the available visa types for the selected country, analyze and recommend the **best matching visa type** from the provided list. Return your response **EXCLUSIVELY as valid JSON** with the recommended visa type ID and a clear explanation of why this visa type was chosen.

DO NOT write explanations, comments, introductions, or any text outside the JSON.

### User Information:
${userInfoText}

### Available Visa Types (you must choose ONLY from this list):
${visaTypesText}

### Generate an EXACT JSON with the following format:
{
  "recommended_visa_type_id": "the UUID of the best matching visa type from the list above",
  "explanations": "a clear and detailed explanation (2-4 sentences) explaining why you chose this specific visa type. The explanation should reference the user's profile (profession, continent of origin, plan period) and how it aligns with the visa type's requirements, category, and steps. Mention which criteria were most relevant in making this recommendation. IMPORTANT: In the explanations field, you MUST ONLY mention the visa type's category name (e.g., 'Work Visa', 'Student Visa', 'Skilled Worker Visa'). NEVER include the visa type ID, UUID, source URL, or any technical identifiers. Use only the category name in a natural, conversational way."
}

### Criteria you must consider when recommending:
1. **Professional Profile Match**: How well the visa type aligns with the user's profession and work experience
2. **Timeline Compatibility**: Whether the visa processing time fits within the user's plan period
3. **Eligibility Likelihood**: How likely the user is to meet the specific requirements based on their profile
4. **Visa Category Relevance**: How relevant the visa category is to the user's immigration goals
5. **Steps Complexity**: Consider the complexity and feasibility of the visa application steps
6. **Continent of Origin**: Any specific advantages or considerations based on the user's continent of origin

### Important Rules:
- You MUST select a visa type ID from the provided list above
- Return ONLY the JSON object with both recommended_visa_type_id and explanations fields
- The explanations field must provide a clear, detailed reasoning (2-4 sentences) that connects the user's profile to the selected visa type
- The explanations field must be in the language: ${language}
- **CRITICAL**: In the explanations field, you MUST ONLY reference the visa type by its category name (e.g., "Work Visa", "Student Visa", "Skilled Worker Visa").
- **FORBIDDEN in explanations field**: Never include the visa type ID, UUID, source URL, steps details, or any technical identifiers. Only use the category name.
- Consider all available visa types before making your recommendation
- If multiple visa types are equally suitable, choose the one with simpler requirements or faster processing
- Your explanation should be specific and reference the user's profession, continent of origin, plan period, and how they relate to the visa type's characteristics
- Write the explanation in a natural, conversational tone, mentioning only the visa category name when referring to the recommended visa type

Now generate **ONLY the JSON**.
  `;
}
