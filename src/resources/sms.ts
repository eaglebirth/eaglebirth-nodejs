import { BaseResource } from './base';

export interface SendSMSParams {
  phoneNumber: string;
  message: string;
  sendingMethod?: 'normal_sms' | 'email_to_sms';
  provider?: string;
}

/**
 * SMS notification resource
 */
export class SMSResource extends BaseResource {
  /**
   * Send an SMS message
   */
  async send(params: SendSMSParams): Promise<any> {
    const data: Record<string, any> = {
      phone_number: params.phoneNumber,
      message: params.message,
    };

    if (params.sendingMethod) data.sending_method = params.sendingMethod;
    if (params.provider) data.provider = params.provider;

    return this.client.makeRequest('POST', '/app/messaging/sms/', data);
  }

  /**
   * Get SMS pricing information
   */
  async getPrices(phoneNumber?: string): Promise<any> {
    const data: Record<string, any> = {};
    if (phoneNumber) data.phone_number = phoneNumber;

    return this.client.makeRequest('POST', '/app/messaging/sms/get_prices_for_sms/', data);
  }
}
