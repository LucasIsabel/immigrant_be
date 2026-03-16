import { wrapInBaseLayout } from './base.template';

type Locale = 'en' | 'pt' | 'es';

const translations: Record<
  Locale,
  {
    subject: string;
    heading: string;
    body: string;
    button: string;
    footer: string;
  }
> = {
  en: {
    subject: 'Reset your password',
    heading: 'Reset your password',
    body: 'We received a request to reset your password. Click the button below to choose a new password.',
    button: 'Reset Password',
    footer:
      'If you did not request a password reset, you can safely ignore this email.',
  },
  pt: {
    subject: 'Redefina sua senha',
    heading: 'Redefina sua senha',
    body: 'Recebemos uma solicitação para redefinir sua senha. Clique no botão abaixo para escolher uma nova senha.',
    button: 'Redefinir Senha',
    footer:
      'Se você não solicitou a redefinição de senha, pode ignorar este email com segurança.',
  },
  es: {
    subject: 'Restablece tu contraseña',
    heading: 'Restablece tu contraseña',
    body: 'Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para elegir una nueva contraseña.',
    button: 'Restablecer Contraseña',
    footer:
      'Si no solicitaste un restablecimiento de contraseña, puedes ignorar este correo de forma segura.',
  },
};

export function buildResetPasswordEmail(
  locale: Locale = 'en',
  url: string,
  userName?: string,
): { subject: string; html: string } {
  const t = translations[locale] ?? translations.en;
  const greeting = userName ? `${userName},` : '';

  const content = `
    <h2 style="margin:0 0 16px;color:#1f2937;font-size:20px;font-weight:600;">${t.heading}</h2>
    ${greeting ? `<p style="margin:0 0 12px;color:#374151;font-size:16px;">${greeting}</p>` : ''}
    <p style="margin:0 0 24px;color:#374151;font-size:16px;line-height:1.5;">${t.body}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
      <tr>
        <td style="background-color:#2563eb;border-radius:6px;">
          <a href="${url}" target="_blank" style="display:inline-block;padding:12px 32px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;">${t.button}</a>
        </td>
      </tr>
    </table>
    <p style="margin:0;color:#9ca3af;font-size:14px;">${t.footer}</p>
  `;

  return { subject: t.subject, html: wrapInBaseLayout(content) };
}
