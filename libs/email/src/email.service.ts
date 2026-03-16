import { Injectable } from '@nestjs/common';
import { sendEmail } from './send-email';

@Injectable()
export class EmailService {
  async send(params: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    return sendEmail(params);
  }
}
