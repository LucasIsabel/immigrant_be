import { wrapInBaseLayout } from './base.template';

type Locale = 'en' | 'pt' | 'es';

const translations: Record<
  Locale,
  {
    subject: string;
    heading: string;
    greeting: string;
    body: string;
    expiry: string;
    button: string;
    fallback: string;
    footer: string;
    security: string;
  }
> = {
  en: {
    subject: 'Reset your password — Aloravia',
    heading: 'Reset your password',
    greeting: 'Hi {name},',
    body: 'We received a request to reset the password for your Aloravia account. Click the button below to choose a new password.',
    expiry:
      'This link expires in <strong>1 hour</strong>. After that, you will need to request a new reset link.',
    button: 'Reset Password',
    fallback:
      "If the button above doesn't work, copy and paste this link into your browser:",
    footer:
      'If you did not request a password reset, you can safely ignore this email. Your password will not be changed.',
    security:
      'If you did not make this request, we recommend changing your password as a precaution.',
  },
  pt: {
    subject: 'Redefina sua senha — Aloravia',
    heading: 'Redefina sua senha',
    greeting: 'Olá, {name}',
    body: 'Recebemos uma solicitação para redefinir a senha da sua conta no Aloravia. Clique no botão abaixo para escolher uma nova senha.',
    expiry:
      'Este link expira em <strong>1 hora</strong>. Após isso, você precisará solicitar um novo link.',
    button: 'Redefinir Senha',
    fallback:
      'Se o botão acima não funcionar, copie e cole este link no seu navegador:',
    footer:
      'Se você não solicitou a redefinição de senha, pode ignorar este email. Sua senha não será alterada.',
    security:
      'Se não foi você que fez esta solicitação, recomendamos trocar sua senha por precaução.',
  },
  es: {
    subject: 'Restablece tu contraseña — Aloravia',
    heading: 'Restablece tu contraseña',
    greeting: 'Hola, {name}',
    body: 'Recibimos una solicitud para restablecer la contraseña de tu cuenta en Aloravia. Haz clic en el botón de abajo para elegir una nueva contraseña.',
    expiry:
      'Este enlace expira en <strong>1 hora</strong>. Después de eso, necesitarás solicitar un nuevo enlace.',
    button: 'Restablecer Contraseña',
    fallback:
      'Si el botón de arriba no funciona, copia y pega este enlace en tu navegador:',
    footer:
      'Si no solicitaste un restablecimiento de contraseña, puedes ignorar este correo. Tu contraseña no será cambiada.',
    security:
      'Si no fuiste tú quien hizo esta solicitud, te recomendamos cambiar tu contraseña como precaución.',
  },
};

export function buildResetPasswordEmail(
  locale: Locale = 'en',
  url: string,
  userName?: string,
): { subject: string; html: string } {
  const t = translations[locale] ?? translations.en;
  const name = userName ?? 'there';
  const greeting = t.greeting.replace('{name}', name);

  const content = `
    <!-- Icon -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;">
      <tr>
        <td align="center">
          <div style="width:64px;height:64px;border-radius:50%;background-color:#fef3c7;display:flex;align-items:center;justify-content:center;margin:0 auto;">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#fef3c7"/>
              <rect x="20" y="30" width="24" height="16" rx="3" stroke="#d97706" stroke-width="2" fill="none"/>
              <path d="M25 30V24C25 20.686 27.686 18 31 18V18C34.314 18 37 20.686 37 24V30" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
              <circle cx="32" cy="38" r="2" fill="#d97706"/>
            </svg>
          </div>
        </td>
      </tr>
    </table>

    <!-- Heading -->
    <h1 style="margin:0 0 8px;color:#0f172a;font-size:24px;font-weight:700;text-align:center;line-height:1.3;">${t.heading}</h1>

    <!-- Greeting + Body -->
    <p style="margin:16px 0 8px;color:#334155;font-size:16px;line-height:1.6;">${greeting}</p>
    <p style="margin:0 0 16px;color:#475569;font-size:15px;line-height:1.6;">${t.body}</p>
    <p style="margin:0 0 28px;color:#64748b;font-size:14px;line-height:1.5;">${t.expiry}</p>

    <!-- CTA Button -->
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
      <tr>
        <td style="background:linear-gradient(135deg,#1d4ed8,#2563eb);border-radius:8px;box-shadow:0 4px 12px rgba(37,99,235,0.35);">
          <a href="${url}" target="_blank" style="display:inline-block;padding:14px 36px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;letter-spacing:0.1px;">${t.button}</a>
        </td>
      </tr>
    </table>

    <!-- Fallback link -->
    <p style="margin:0 0 6px;color:#64748b;font-size:13px;line-height:1.5;">${t.fallback}</p>
    <p style="margin:0 0 28px;"><a href="${url}" style="color:#2563eb;font-size:12px;word-break:break-all;text-decoration:underline;">${url}</a></p>

    <!-- Divider -->
    <hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 20px;">

    <!-- Footer notes -->
    <p style="margin:0 0 8px;color:#94a3b8;font-size:13px;line-height:1.5;">${t.footer}</p>
    <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.5;">${t.security}</p>
  `;

  return { subject: t.subject, html: wrapInBaseLayout(content) };
}
