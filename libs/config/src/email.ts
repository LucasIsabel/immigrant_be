import { Resend } from 'resend';
import { env } from './env';

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(params: {
  to: string;
  subject: string;
  url: string;
}) {
  const { to, subject, url } = params;
  const { data, error } = await resend.emails.send({
    from: `Immigrant <${env.EMAIL_FROM}>`,
    to: [to],
    subject,
    html: `
      <p>Clique no link abaixo para verificar seu email:</p>
      <p><a href="${url}">${url}</a></p>
      <p>Se você não criou esta conta, ignore este email.</p>
    `,
  });

  if (error) {
    console.error('[email] Verification email failed:', error);
  }

  return { data, error };
}
