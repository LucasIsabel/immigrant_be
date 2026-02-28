import { Resend } from 'resend';
import { env } from '@app/config/env';

let resendInstance: Resend | null = null;

function getResend(): Resend {
  if (!resendInstance) {
    resendInstance = new Resend(env.RESEND_API_KEY);
  }
  return resendInstance;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  const resend = getResend();

  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });

  if (error) {
    console.error('Failed to send email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}
