import { wrapInBaseLayout, escapeHtml } from './base.template';
import { type EmailLocale, resolveLocale } from './locale';

/**
 * The harder of the two, and the one where language matters most.
 *
 * It carries a reason written by a human admin and an instruction on what to
 * do next. An owner who cannot read it learns only that they were refused,
 * which is the version most likely to end with them leaving.
 *
 * The reason itself stays in whatever language the admin wrote it — it is
 * their words, and translating somebody's words is not this template's job.
 */
const translations: Record<
  EmailLocale,
  {
    subjectPage: string;
    subjectUpdate: string;
    headingPage: string;
    headingUpdate: string;
    greeting: string;
    bodyPage: string;
    bodyUpdate: string;
    reasonLabel: string;
    resubmit: string;
    button: string;
  }
> = {
  pt: {
    subjectPage: 'A sua página não foi aprovada — Aloravia',
    subjectUpdate: 'A sua atualização não foi aprovada — Aloravia',
    headingPage: 'A sua página não foi aprovada',
    headingUpdate: 'A sua atualização não foi aprovada',
    greeting: 'Olá,',
    bodyPage:
      'A página de <strong>{name}</strong> não foi aprovada pela moderação.',
    bodyUpdate:
      'A atualização enviada para a página de <strong>{name}</strong> não foi aprovada pela moderação. A versão que está no ar continua visível.',
    reasonLabel: 'Motivo:',
    resubmit: 'Pode editar e submeter de novo a qualquer momento.',
    button: 'Editar e submeter de novo →',
  },
  en: {
    subjectPage: 'Your page was not approved — Aloravia',
    subjectUpdate: 'Your update was not approved — Aloravia',
    headingPage: 'Your page was not approved',
    headingUpdate: 'Your update was not approved',
    greeting: 'Hello,',
    bodyPage: 'The page for <strong>{name}</strong> was not approved.',
    bodyUpdate:
      'The update sent for <strong>{name}</strong> was not approved. The version already live stays up.',
    reasonLabel: 'Reason:',
    resubmit: 'You can edit and submit it again whenever you like.',
    button: 'Edit and submit again →',
  },
  es: {
    subjectPage: 'Tu página no fue aprobada — Aloravia',
    subjectUpdate: 'Tu actualización no fue aprobada — Aloravia',
    headingPage: 'Tu página no fue aprobada',
    headingUpdate: 'Tu actualización no fue aprobada',
    greeting: 'Hola:',
    bodyPage: 'La página de <strong>{name}</strong> no fue aprobada.',
    bodyUpdate:
      'La actualización enviada para <strong>{name}</strong> no fue aprobada. La versión que ya está en línea sigue visible.',
    reasonLabel: 'Motivo:',
    resubmit: 'Puedes editarla y enviarla de nuevo cuando quieras.',
    button: 'Editar y enviar de nuevo →',
  },
};

export function buildRejectionEmail(
  businessName: string,
  isUpdate: boolean,
  dashboardUrl: string,
  reason?: string,
  locale?: string | null,
): { subject: string; html: string } {
  const t = translations[resolveLocale(locale)];
  const safeName = escapeHtml(businessName);
  const safeReason = reason ? escapeHtml(reason) : undefined;

  const subject = isUpdate ? t.subjectUpdate : t.subjectPage;
  const heading = isUpdate ? t.headingUpdate : t.headingPage;
  const body = (isUpdate ? t.bodyUpdate : t.bodyPage).replace(
    '{name}',
    safeName,
  );

  const reasonHtml = safeReason
    ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 16px;margin:16px 0;">
        <p style="margin:0 0 4px;font-size:12px;color:#991b1b;font-weight:600;">${t.reasonLabel}</p>
        <p style="margin:0;color:#7f1d1d;font-size:14px;line-height:1.5;">${safeReason}</p>
       </div>`
    : '';

  const content = `
    <h1 style="margin:0 0 8px;color:#0f172a;font-size:24px;font-weight:700;text-align:center;line-height:1.3;">
      ${heading}
    </h1>
    <p style="margin:16px 0 8px;color:#334155;font-size:16px;line-height:1.6;">${t.greeting}</p>
    <p style="margin:0 0 8px;color:#475569;font-size:15px;line-height:1.6;">${body}</p>
    ${reasonHtml}
    <p style="margin:8px 0 20px;color:#475569;font-size:14px;line-height:1.6;">
      ${t.resubmit}
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
      <tr>
        <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:8px;box-shadow:0 4px 12px rgba(37,99,235,0.35);">
          <a href="${dashboardUrl}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;letter-spacing:0.1px;">
            ${t.button}
          </a>
        </td>
      </tr>
    </table>
  `;

  return { subject, html: wrapInBaseLayout(content) };
}
