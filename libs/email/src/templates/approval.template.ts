import { wrapInBaseLayout } from './base.template';

export function buildApprovalEmail(
  businessName: string,
  pageUrl: string,
): { subject: string; html: string } {
  const subject = `Sua página foi aprovada! — ImmigrantMatch`;

  const content = `
    <h1 style="margin:0 0 8px;color:#0f172a;font-size:24px;font-weight:700;text-align:center;line-height:1.3;">
      Sua página foi aprovada!
    </h1>
    <p style="margin:16px 0 8px;color:#334155;font-size:16px;line-height:1.6;">Olá,</p>
    <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6;">
      Boa notícia! A página pública de <strong>${businessName}</strong> foi revisada e
      aprovada pela nossa equipa. Ela já está visível para toda a comunidade.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
      <tr>
        <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:8px;box-shadow:0 4px 12px rgba(37,99,235,0.35);">
          <a href="${pageUrl}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;letter-spacing:0.1px;">
            Ver minha página →
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
