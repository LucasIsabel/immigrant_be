import { wrapInBaseLayout } from './base.template';

type Locale = 'en' | 'pt' | 'es';

const translations: Record<
  Locale,
  { subject: string; heading: string; body: string; button: string; footer: string }
> = {
  en: {
    subject: 'Verify your email address',
    heading: 'Verify your email',
    body: 'Thanks for signing up! Please click the button below to verify your email address.',
    button: 'Verify Email',
    footer: 'If you did not create an account, you can safely ignore this email.',
  },
  pt: {
    subject: 'Verifique seu endereço de email',
    heading: 'Verifique seu email',
    body: 'Obrigado por se cadastrar! Clique no botão abaixo para verificar seu endereço de email.',
    button: 'Verificar Email',
    footer: 'Se você não criou uma conta, pode ignorar este email com segurança.',
  },
  es: {
    subject: 'Verifica tu dirección de correo electrónico',
    heading: 'Verifica tu correo',
    body: 'Gracias por registrarte. Haz clic en el botón de abajo para verificar tu dirección de correo electrónico.',
    button: 'Verificar Correo',
    footer: 'Si no creaste una cuenta, puedes ignorar este correo de forma segura.',
  },
};

export function buildVerificationEmail(
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
