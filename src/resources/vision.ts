import { BaseResource } from './base';

export type ImageType = 'object' | 'link';

export interface ExtractFaceDetailsParams {
  image: string | Buffer;
  imageType?: ImageType;
}

export interface CompareFacesParams {
  image1: string | Buffer;
  image2: string | Buffer;
  image1Type?: ImageType;
  image2Type?: ImageType;
}

export interface ExtractTextParams {
  image: string | Buffer;
  imageType?: ImageType;
}

/**
 * Image processing/Vision AI resource
 */
export class VisionResource extends BaseResource {
  /**
   * Extract face details from an image
   */
  async extractFaceDetails(params: ExtractFaceDetailsParams): Promise<any> {
    const imageType = params.imageType || 'object';
    const data: Record<string, any> = { image_type: imageType };
    const files: Record<string, string | Buffer> = {};

    if (imageType === 'link' && typeof params.image === 'string') {
      data.image = params.image;
    } else if (imageType === 'object') {
      files.image = params.image;
    }

    return this.client.makeRequest(
      'POST',
      '/app/image_processing/get_details_from_an_image/',
      data,
      files
    );
  }

  /**
   * Compare two faces
   */
  async compareFaces(params: CompareFacesParams): Promise<any> {
    const image1Type = params.image1Type || 'object';
    const image2Type = params.image2Type || 'object';

    const data: Record<string, any> = {
      image1_type: image1Type,
      image2_type: image2Type,
    };
    const files: Record<string, string | Buffer> = {};

    if (image1Type === 'link' && typeof params.image1 === 'string') {
      data.image1 = params.image1;
    } else if (image1Type === 'object') {
      files.image1 = params.image1;
    }

    if (image2Type === 'link' && typeof params.image2 === 'string') {
      data.image2 = params.image2;
    } else if (image2Type === 'object') {
      files.image2 = params.image2;
    }

    return this.client.makeRequest(
      'POST',
      '/app/image_processing/compare_two_faces_in_two_images/',
      data,
      files
    );
  }

  /**
   * Extract text from an image (OCR)
   */
  async extractText(params: ExtractTextParams): Promise<any> {
    const imageType = params.imageType || 'object';
    const data: Record<string, any> = { image_type: imageType };
    const files: Record<string, string | Buffer> = {};

    if (imageType === 'link' && typeof params.image === 'string') {
      data.image = params.image;
    } else if (imageType === 'object') {
      files.image = params.image;
    }

    return this.client.makeRequest(
      'POST',
      '/app/image_processing/get_text_from_image/',
      data,
      files
    );
  }
}
