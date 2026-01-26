import { BaseResource } from './base';

export interface SendWhatsAppParams {
  phoneNumber: string;
  message: string;
  template?: string;
}

/**
 * WhatsApp notification resource
 */
export class WhatsAppResource extends BaseResource {
  /**
   * Send a WhatsApp message
   */
  async send(params: SendWhatsAppParams): Promise<any> {
    const data: Record<string, any> = {
      phone_number: params.phoneNumber,
      message: params.message,
      template: params.template || 'normal_message',
    };

    return this.client.makeRequest('POST', '/app/messaging/whatsapp/', data);
  }
}
