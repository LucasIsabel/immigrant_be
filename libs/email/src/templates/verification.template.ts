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
    subject: 'Verify your email address — ImmigrantMatch',
    heading: 'Verify your email address',
    greeting: 'Hi {name},',
    body: 'Thanks for signing up for ImmigrantMatch! Please verify your email address to activate your account and get started.',
    expiry: 'This link expires in <strong>24 hours</strong>.',
    button: 'Verify Email Address',
    fallback:
      "If the button above doesn't work, copy and paste this link into your browser:",
    footer:
      'If you did not create an account on ImmigrantMatch, you can safely ignore this email.',
    security: 'For security, never share this link with anyone.',
  },
  pt: {
    subject: 'Verifique seu endereço de email — ImmigrantMatch',
    heading: 'Verifique seu endereço de email',
    greeting: 'Olá, {name}',
    body: 'Obrigado por se cadastrar no ImmigrantMatch! Verifique seu endereço de email para ativar sua conta.',
    expiry: 'Este link expira em <strong>24 horas</strong>.',
    button: 'Verificar Email',
    fallback:
      'Se o botão acima não funcionar, copie e cole este link no seu navegador:',
    footer:
      'Se você não criou uma conta no ImmigrantMatch, pode ignorar este email com segurança.',
    security: 'Por segurança, nunca compartilhe este link com ninguém.',
  },
  es: {
    subject: 'Verifica tu dirección de correo electrónico — ImmigrantMatch',
    heading: 'Verifica tu correo electrónico',
    greeting: 'Hola, {name}',
    body: '¡Gracias por registrarte en ImmigrantMatch! Verifica tu correo electrónico para activar tu cuenta.',
    expiry: 'Este enlace expira en <strong>24 horas</strong>.',
    button: 'Verificar Correo',
    fallback:
      'Si el botón de arriba no funciona, copia y pega este enlace en tu navegador:',
    footer:
      'Si no creaste una cuenta en ImmigrantMatch, puedes ignorar este correo de forma segura.',
    security: 'Por seguridad, nunca compartas este enlace con nadie.',
  },
};

export function buildVerificationEmail(
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
          <div style="width:64px;height:64px;border-radius:50%;background-color:#dbeafe;display:flex;align-items:center;justify-content:center;margin:0 auto;">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#dbeafe"/>
              <path d="M18 26C18 24.9 18.9 24 20 24H44C45.1 24 46 24.9 46 26V40C46 41.1 45.1 42 44 42H20C18.9 42 18 41.1 18 40V26Z" stroke="#2563eb" stroke-width="2" fill="none" stroke-linejoin="round"/>
              <path d="M18 27L32 35L46 27" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
