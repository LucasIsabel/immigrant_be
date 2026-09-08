import { buildCommentWaitingEmail } from './comment-waiting.template';

describe('buildCommentWaitingEmail', () => {
  const build = () =>
    buildCommentWaitingEmail(
      'Tasca do Bairro',
      'Ana Costa',
      'O prato veio com uma mosca.',
      'https://app.test/dashboard/my-business/b-1/comments',
    );

  it('names the page and the person, and links to the queue', () => {
    const { subject, html } = build();

    expect(subject).toContain('à espera');
    expect(html).toContain('Tasca do Bairro');
    expect(html).toContain('Ana Costa');
    expect(html).toContain('O prato veio com uma mosca.');
    expect(html).toContain(
      'https://app.test/dashboard/my-business/b-1/comments',
    );
  });

  /*
   * The name and the excerpt are written by whoever commented. Unescaped, a
   * comment is a way to put markup — and a link — inside a message the owner
   * has every reason to trust.
   */
  it('escapes what the commenter wrote', () => {
    const { html } = buildCommentWaitingEmail(
      '<script>alert(1)</script>',
      'Ana & Bruno',
      '<img src=x onerror=alert(1)>',
      'https://app.test/queue',
    );

    expect(html).not.toContain('<script>');
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('Ana &amp; Bruno');
  });

  it('says the rule the owner needs to know', () => {
    // Somebody who has never seen this queue has to learn, from the message
    // itself, why only some comments arrive in it.
    expect(build().html).toContain('de texto publicam na hora');
  });
});
