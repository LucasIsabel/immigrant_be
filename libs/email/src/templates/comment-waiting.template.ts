import { wrapInBaseLayout, escapeHtml } from './base.template';

// TODO(i18n): hardcoded to pt-PT — extend with locale param when multi-language support is needed
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
): { subject: string; html: string } {
  const subject = `Um comentário com foto está à espera — Aloravia`;

  const safeTitle = escapeHtml(targetTitle);
  const safeAuthor = escapeHtml(authorName);
  const safeExcerpt = escapeHtml(excerpt);

  const content = `
    <h1 style="margin:0 0 8px;color:#0f172a;font-size:24px;font-weight:700;text-align:center;line-height:1.3;">
      Um comentário com foto está à espera
    </h1>
    <p style="margin:16px 0 8px;color:#334155;font-size:16px;line-height:1.6;">Olá,</p>
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
      <strong>${safeAuthor}</strong> comentou em <strong>${safeTitle}</strong> e
      juntou uma fotografia. Comentários com foto só ficam visíveis depois de
      você os libertar — os de texto publicam na hora.
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
            Ver o comentário →
          </a>
        </td>
      </tr>
    </table>
  `;

  return { subject, html: wrapInBaseLayout(content) };
}
