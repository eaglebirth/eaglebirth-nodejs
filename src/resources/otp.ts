import { BaseResource } from './base';

export type ValidationType = 'email' | 'sms' | 'whatsapp' | 'whatsapp_return';

export interface SendOTPParams {
  validationType: ValidationType;
  email?: string;
  phoneNumber?: string;
  provider?: string;
  codeLength?: number;
  timeout?: number;
  trials?: number;
}

export interface ValidateOTPParams {
  codeId: string;
  code: string;
}

/**
 * OTP/Verification code resource
 */
export class OTPResource extends BaseResource {
  /**
   * Send an OTP/verification code
   */
  async send(params: SendOTPParams): Promise<any> {
    const data: Record<string, any> = {
      validation_type: params.validationType,
      code_length: params.codeLength || 6,
      timeout: params.timeout || 180,
      trials: params.trials || 3,
    };

    if (params.email) data.email = params.email;
    if (params.phoneNumber) data.phone_number = params.phoneNumber;
    if (params.provider) data.provider = params.provider;

    return this.client.makeRequest('POST', '/app/code_validation/', data);
  }

  /**
   * Validate an OTP code
   */
  async validate(params: ValidateOTPParams): Promise<any> {
    const data = {
      code_id: params.codeId,
      code: params.code,
    };

    return this.client.makeRequest('POST', '/app/code_validation/validate_code_sent/', data);
  }

  /**
   * Check if a code was successfully validated
   */
  async checkValidated(codeId: string): Promise<any> {
    const data = { code_id: codeId };
    return this.client.makeRequest('POST', '/app/code_validation/check_validated_code/', data);
  }
}
