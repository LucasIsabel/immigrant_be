export { EmailModule } from './email.module';
export { EmailService } from './email.service';
export { sendEmail } from './send-email';
export { buildVerificationEmail } from './templates/verification.template';
export { buildResetPasswordEmail } from './templates/reset-password.template';
export { buildApprovalEmail } from './templates/approval.template';
export { buildRejectionEmail } from './templates/rejection.template';
export { buildCommentWaitingEmail } from './templates/comment-waiting.template';
export {
  DEFAULT_EMAIL_LOCALE,
  resolveLocale,
  type EmailLocale,
} from './templates/locale';
