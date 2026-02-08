import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
import { createReadStream, statSync } from 'fs';
import {
  EagleBirthError,
  AuthenticationError,
  APIError,
  ValidationError,
  RateLimitError,
} from './exceptions';
import {
  EmailResource,
  SMSResource,
  WhatsAppResource,
  OTPResource,
  QRCodeResource,
  VisionResource,
  StorageResource,
  UserManagementResource,
} from './resources';

export interface EagleBirthConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
}

/**
 * EagleBirth API Client
 */
export class EagleBirth {
  private static readonly PRODUCTION_URL = 'https://eaglebirth.com/api';
  private static readonly SANDBOX_URL = 'https://sandbox.eaglebirth.com/api';
  private static readonly VERSION = '1.1.2';

  private apiKey: string;
  private baseUrl: string;
  private timeout: number;
  private httpClient: AxiosInstance;

  // Resources
  public readonly email: EmailResource;
  public readonly sms: SMSResource;
  public readonly whatsapp: WhatsAppResource;
  public readonly otp: OTPResource;
  public readonly qr: QRCodeResource;
  public readonly vision: VisionResource;
  public readonly storage: StorageResource;
  public readonly users: UserManagementResource;

  constructor(config: string | EagleBirthConfig) {
    // Support both string and config object
    if (typeof config === 'string') {
      this.apiKey = config;
      this.baseUrl = this.getBaseUrl(config, undefined);
      this.timeout = 30000;
    } else {
      this.apiKey = config.apiKey;
      this.baseUrl = this.getBaseUrl(config.apiKey, config.baseUrl);
      this.timeout = config.timeout || 30000;
    }

    // Validate API key format
    if (!this.apiKey.startsWith('eb_test_') && !this.apiKey.startsWith('eb_live_')) {
      throw new ValidationError(
        'Invalid API key format. Must start with eb_test_ or eb_live_'
      );
    }

    // Initialize HTTP client
    this.httpClient = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'User-Agent': `EagleBirth-NodeJS/${EagleBirth.VERSION}`,
      },
    });

    // Initialize resources
    this.email = new EmailResource(this);
    this.sms = new SMSResource(this);
    this.whatsapp = new WhatsAppResource(this);
    this.otp = new OTPResource(this);
    this.qr = new QRCodeResource(this);
    this.vision = new VisionResource(this);
    this.storage = new StorageResource(this);
    this.users = new UserManagementResource(this);
  }

  /**
   * Auto-detect base URL from API key if not provided
   */
  private getBaseUrl(apiKey: string, providedBaseUrl?: string): string {
    if (providedBaseUrl) {
      return providedBaseUrl;
    }
    return apiKey.startsWith('eb_test_')
      ? EagleBirth.SANDBOX_URL
      : EagleBirth.PRODUCTION_URL;
  }

  /**
   * Make an HTTP request to the API
   */
  async makeRequest(
    method: string,
    endpoint: string,
    data?: Record<string, any>,
    files?: Record<string, string | Buffer>
  ): Promise<any> {
    try {
      let requestData: any = data;
      let headers: Record<string, string> = {};

      // Handle file uploads
      if (files && Object.keys(files).length > 0) {
        const formData = new FormData();

        // Add regular data fields
        if (data) {
          for (const [key, value] of Object.entries(data)) {
            if (value !== null && value !== undefined) {
              formData.append(key, String(value));
            }
          }
        }

        // Add file fields
        for (const [key, file] of Object.entries(files)) {
          if (typeof file === 'string') {
            // File path
            try {
              statSync(file); // Check if file exists
              formData.append(key, createReadStream(file));
            } catch (error) {
              throw new ValidationError(`File not found: ${file}`);
            }
          } else {
            // Buffer
            formData.append(key, file);
          }
        }

        requestData = formData;
        headers = formData.getHeaders();
      }

      const config: AxiosRequestConfig = {
        method: method.toUpperCase(),
        url: endpoint,
        data: requestData,
        headers,
      };

      const response = await this.httpClient.request(config);
      return response.data;
    } catch (error: any) {
      // Handle axios errors
      if (error.response) {
        const status = error.response.status;
        const data = error.response.data;
        const message = data?.message || data?.detail || 'API request failed';

        if (status === 401 || status === 403) {
          throw new AuthenticationError(message);
        } else if (status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          throw new RateLimitError(message, retryAfter ? parseInt(retryAfter) : undefined);
        } else if (status >= 400 && status < 500) {
          throw new ValidationError(message);
        } else {
          throw new APIError(message, status, data);
        }
      } else if (error.request) {
        throw new EagleBirthError('No response received from API');
      } else {
        throw new EagleBirthError(error.message || 'Request failed');
      }
    }
  }
}
