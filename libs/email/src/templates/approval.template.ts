import { wrapInBaseLayout, escapeHtml } from './base.template';
import { type Locale, resolveLocale } from '@app/config/locale';

/**
 * The first thing an owner hears back after handing over their page.
 *
 * It was Portuguese only, subject included, which meant an owner who
 * registered in English or Spanish got the good news in a language they may
 * not read — at the one moment the platform had their full attention.
 */
const translations: Record<
  Locale,
  {
    subject: string;
    heading: string;
    greeting: string;
    body: string;
    button: string;
  }
> = {
  pt: {
    subject: 'A sua página foi aprovada! — Aloravia',
    heading: 'A sua página foi aprovada!',
    greeting: 'Olá,',
    body: 'Boa notícia! A página pública de <strong>{name}</strong> foi revista e aprovada. Já está visível para toda a comunidade.',
    button: 'Ver a minha página →',
  },
  en: {
    subject: 'Your page has been approved — Aloravia',
    heading: 'Your page has been approved',
    greeting: 'Hello,',
    body: 'Good news. The public page for <strong>{name}</strong> has been reviewed and approved. It is live for everyone now.',
    button: 'See my page →',
  },
  es: {
    subject: '¡Tu página ha sido aprobada! — Aloravia',
    heading: '¡Tu página ha sido aprobada!',
    greeting: 'Hola:',
    body: '¡Buenas noticias! La página pública de <strong>{name}</strong> ha sido revisada y aprobada. Ya está visible para toda la comunidad.',
    button: 'Ver mi página →',
  },
};

export function buildApprovalEmail(
  businessName: string,
  pageUrl: string,
  locale?: string | null,
): { subject: string; html: string } {
  const t = translations[resolveLocale(locale)];
  const safeName = escapeHtml(businessName);

  const content = `
    <h1 style="margin:0 0 8px;color:#0f172a;font-size:24px;font-weight:700;text-align:center;line-height:1.3;">
      ${t.heading}
    </h1>
    <p style="margin:16px 0 8px;color:#334155;font-size:16px;line-height:1.6;">${t.greeting}</p>
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
      ${t.body.replace('{name}', safeName)}
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
      <tr>
        <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:8px;box-shadow:0 4px 12px rgba(37,99,235,0.35);">
          <a href="${pageUrl}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;letter-spacing:0.1px;">
            ${t.button}
          </a>
        </td>
      </tr>
    </table>
  `;

  return { subject: t.subject, html: wrapInBaseLayout(content) };
}
