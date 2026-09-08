/**
 * The photos on a business page, judged as pictures.
 *
 * `business-page-moderation.prompt.ts` is handed the same photos as URLs and
 * told to apply the adult-content rule to them, which cannot work: an R2 key
 * is `business/{uuid}.jpg` and says nothing about the image. Until this
 * existed, the text was moderated and the pictures never were — the only eyes
 * on them belonged to whichever admin opened the review screen.
 */
export function buildImageModerationPrompt(count: number): string {
  return `
You are a content safety reviewer for a business directory. ${count} image${
    count === 1 ? '' : 's'
  } from a business page ${count === 1 ? 'is' : 'are'} attached, in order.

Judge each image on what it shows, and flag:

1. **pornography** — sexual acts, explicit sexual content
2. **nudity** — exposed genitals, buttocks or female breasts; swimwear and
   ordinary beachwear are NOT nudity
3. **violence** — gore, injury, weapons used against people
4. **illegal** — drugs, weapons for sale, counterfeit goods
5. **unrelated** — screenshots, memes, stock watermarks, text-only images, or
   a picture that has nothing to do with a business listing

## Rules
- Refer to each image by its **index**, counting from 0 in the order attached.
- Report only what you can actually see. A picture you cannot make out is not
  a violation — say so in the summary and leave it unflagged.
- This is a directory of restaurants, guides, shops and services. Food, rooms,
  streets, tools, staff at work and customers are all normal and expected.
- People in ordinary clothing are normal. A person in a swimsuit at a beach
  business is normal. Neither is nudity.
- \`riskLevel\`: "high" if anything under pornography, nudity, violence or
  illegal appears; "medium" if something is only unrelated or you are unsure;
  "low" when every image is a plausible business photo.

## Response Format
Return a valid JSON object matching this structure:
{
  "riskLevel": "low" | "medium" | "high",
  "findings": [
    { "index": 0, "category": "pornography" | "nudity" | "violence" | "illegal" | "unrelated", "reason": "brief explanation of what is visible" }
  ],
  "summary": "A concise summary in Portuguese (pt-BR)"
}

Return ONLY the JSON object. No markdown code fences.
`.trim();
}
