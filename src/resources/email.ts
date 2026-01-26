import { BaseResource } from './base';

export interface SendEmailParams {
  email: string;
  subject: string;
  message: string;
  replyTo?: string;
  header?: string;
  salutation?: string;
}

/**
 * Email notification resource
 */
export class EmailResource extends BaseResource {
  /**
   * Send an email
   */
  async send(params: SendEmailParams): Promise<any> {
    const data: Record<string, any> = {
      email: params.email,
      subject: params.subject,
      message: params.message,
    };

    if (params.replyTo) data.reply_to = params.replyTo;
    if (params.header) data.header = params.header;
    if (params.salutation) data.salutation = params.salutation;

    return this.client.makeRequest('POST', '/app/messaging/email/', data);
  }
}
