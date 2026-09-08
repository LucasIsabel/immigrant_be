import { buildImageModerationPrompt } from './image-moderation.prompt';

describe('buildImageModerationPrompt', () => {
  it('tells the model how many pictures it is looking at', () => {
    expect(buildImageModerationPrompt(3)).toContain('3 images');
  });

  it('reads correctly for a single picture', () => {
    const prompt = buildImageModerationPrompt(1);

    expect(prompt).toContain('1 image from a business page is attached');
    expect(prompt).not.toContain('1 images');
  });

  /**
   * The findings come back by index, so the counting rule has to be explicit:
   * a flag pinned to the wrong photo sends a reviewer looking for something
   * that is not there.
   */
  it('fixes the counting at zero and ties it to the order sent', () => {
    const prompt = buildImageModerationPrompt(2);

    expect(prompt).toContain('counting from 0 in the order attached');
  });

  /**
   * This is a directory of restaurants, guides and shops. A moderator that
   * flags a chef, a hotel room or someone at a beach business makes the queue
   * useless and teaches whoever reads it to approve without looking.
   */
  it('says plainly what is normal, so ordinary business photos pass', () => {
    const prompt = buildImageModerationPrompt(5);

    expect(prompt).toMatch(/swimwear and\s+ordinary beachwear are NOT nudity/);
    expect(prompt).toMatch(/Food, rooms,\s+streets, tools, staff at work/);
  });

  it('does not let an unreadable picture count as a violation', () => {
    expect(buildImageModerationPrompt(1)).toContain(
      'A picture you cannot make out is not',
    );
  });
});
