import { BaseResource } from './base';

export interface GenerateQRParams {
  text: string;
  image?: string | Buffer;
  imageType?: 'object' | 'link';
  color?: string;
  backgroundColor?: string;
  qrType?: string;
}

/**
 * QR code generation resource
 */
export class QRCodeResource extends BaseResource {
  /**
   * Generate a QR code
   */
  async generate(params: GenerateQRParams): Promise<any> {
    const data: Record<string, any> = {
      text: params.text,
    };

    if (params.color) data.color = params.color;
    if (params.backgroundColor) data.background_color = params.backgroundColor;
    if (params.qrType) data.qr_type = params.qrType;
    if (params.imageType) data.image_type = params.imageType || 'object';

    const files: Record<string, string | Buffer> = {};

    if (params.image) {
      if (params.imageType === 'link' && typeof params.image === 'string') {
        data.image = params.image;
      } else if (params.imageType === 'object') {
        files.image = params.image;
      }
    }

    return this.client.makeRequest('POST', '/app/qr_code_generator/', data, files);
  }
}
