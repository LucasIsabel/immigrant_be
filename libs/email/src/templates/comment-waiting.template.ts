import { type Locale, resolveLocale } from '@app/config/locale';
import { wrapInBaseLayout, escapeHtml } from './base.template';

const translations: Record<
  Locale,
  {
    subject: string;
    heading: string;
    greeting: string;
    body: string;
    cta: string;
  }
> = {
  pt: {
    subject: 'Um comentário com foto está à espera — Aloravia',
    heading: 'Um comentário com foto está à espera',
    greeting: 'Olá,',
    body:
      '<strong>{author}</strong> comentou em <strong>{title}</strong> e juntou ' +
      'uma fotografia. Comentários com foto só ficam visíveis depois de você os ' +
      'libertar — os de texto publicam na hora.',
    cta: 'Ver o comentário →',
  },
  en: {
    subject: 'A comment with a photo is waiting — Aloravia',
    heading: 'A comment with a photo is waiting',
    greeting: 'Hello,',
    body:
      '<strong>{author}</strong> commented on <strong>{title}</strong> and ' +
      'attached a photo. Comments with photos only appear once you release ' +
      'them — text-only ones publish straight away.',
    cta: 'See the comment →',
  },
  es: {
    subject: 'Un comentario con foto está esperando — Aloravia',
    heading: 'Un comentario con foto está esperando',
    greeting: 'Hola:',
    body:
      '<strong>{author}</strong> comentó en <strong>{title}</strong> y adjuntó ' +
      'una fotografía. Los comentarios con foto solo se ven cuando usted los ' +
      'libera — los de texto se publican al instante.',
    cta: 'Ver el comentario →',
  },
};

/**
 * Tells an owner that a comment with a photo is waiting for them.
 *
 * Only photos reach this queue, and that is what makes the e-mail worth
 * sending: a message for every comment would be noise nobody reads, while a
 * queue nobody is told about is a queue nobody empties.
 */
export function buildCommentWaitingEmail(
  targetTitle: string,
  authorName: string,
  excerpt: string,
  queueUrl: string,
  locale?: string | null,
): { subject: string; html: string } {
  const t = translations[resolveLocale(locale)];

  const safeTitle = escapeHtml(targetTitle);
  const safeAuthor = escapeHtml(authorName);
  const safeExcerpt = escapeHtml(excerpt);

  const body = t.body
    .replace('{author}', safeAuthor)
    .replace('{title}', safeTitle);

  const content = `
    <h1 style="margin:0 0 8px;color:#0f172a;font-size:24px;font-weight:700;text-align:center;line-height:1.3;">
      ${t.heading}
    </h1>
    <p style="margin:16px 0 8px;color:#334155;font-size:16px;line-height:1.6;">${t.greeting}</p>
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
      ${body}
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:0 0 24px;">
      <tr>
        <td style="border-left:3px solid #cbd5e1;padding:4px 0 4px 14px;color:#475569;font-size:15px;line-height:1.6;font-style:italic;">
          ${safeExcerpt}
        </td>
      </tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
      <tr>
        <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:8px;box-shadow:0 4px 12px rgba(37,99,235,0.35);">
          <a href="${queueUrl}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;letter-spacing:0.1px;">
            ${t.cta}
          </a>
        </td>
      </tr>
    </table>
  `;

  return { subject: t.subject, html: wrapInBaseLayout(content) };
}
