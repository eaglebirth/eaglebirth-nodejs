/**
 * Base exception class for EagleBirth SDK errors
 */
export class EagleBirthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EagleBirthError';
    Object.setPrototypeOf(this, EagleBirthError.prototype);
  }
}

/**
 * Raised when API authentication fails
 */
export class AuthenticationError extends EagleBirthError {
  constructor(message: string = 'Invalid API key or authentication failed') {
    super(message);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Raised when the API returns an error response
 */
export class APIError extends EagleBirthError {
  public statusCode: number;
  public response: any;

  constructor(message: string, statusCode: number, response?: any) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.response = response;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

/**
 * Raised when request validation fails
 */
export class ValidationError extends EagleBirthError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Raised when rate limit is exceeded
 */
export class RateLimitError extends EagleBirthError {
  public retryAfter?: number;

  constructor(message: string = 'Rate limit exceeded', retryAfter?: number) {
    super(message);
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}
