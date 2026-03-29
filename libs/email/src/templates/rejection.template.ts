import { wrapInBaseLayout } from './base.template';

export function buildRejectionEmail(
  businessName: string,
  isUpdate: boolean,
  dashboardUrl: string,
  reason?: string,
): { subject: string; html: string } {
  const subject = isUpdate
    ? `Sua atualização não foi aprovada — ImmigrantMatch`
    : `Sua página não foi aprovada — ImmigrantMatch`;

  const heading = isUpdate
    ? 'Sua atualização não foi aprovada'
    : 'Sua página não foi aprovada';

  const body = isUpdate
    ? `A atualização enviada para a página de <strong>${businessName}</strong> não foi aprovada pela nossa equipa de moderação. A versão atual da sua página continua visível.`
    : `A página de <strong>${businessName}</strong> não foi aprovada pela nossa equipa de moderação.`;

  const reasonHtml = reason
    ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 16px;margin:16px 0;">
        <p style="margin:0 0 4px;font-size:12px;color:#991b1b;font-weight:600;">Motivo:</p>
        <p style="margin:0;color:#7f1d1d;font-size:14px;line-height:1.5;">${reason}</p>
       </div>`
    : '';

  const content = `
    <h1 style="margin:0 0 8px;color:#0f172a;font-size:24px;font-weight:700;text-align:center;line-height:1.3;">
      ${heading}
    </h1>
    <p style="margin:16px 0 8px;color:#334155;font-size:16px;line-height:1.6;">Olá,</p>
    <p style="margin:0 0 8px;color:#475569;font-size:15px;line-height:1.6;">${body}</p>
    ${reasonHtml}
    <p style="margin:8px 0 20px;color:#475569;font-size:14px;line-height:1.6;">
      Pode editar e resubmeter a sua página a qualquer momento.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
      <tr>
        <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:8px;box-shadow:0 4px 12px rgba(37,99,235,0.35);">
          <a href="${dashboardUrl}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;letter-spacing:0.1px;">
            Editar e resubmeter →
          </a>
        </td>
      </tr>
    </table>
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 20px;">
    <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.5;">
      ImmigrantMatch · Não responda a este email
    </p>
  `;

  return { subject, html: wrapInBaseLayout(content) };
}
