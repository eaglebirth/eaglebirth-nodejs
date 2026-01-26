import { BaseResource } from './base';

export interface CreateUserParams {
  email?: string;
  username?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  birth?: string;
  password?: string;
  refererId?: string;
  authenticationType?: string;
  authenticationTypeId?: string;
}

export interface GetUserParams {
  username?: string;
  userId?: string;
  authenticationType?: string;
  authenticationTypeId?: string;
}

export interface UpdateUserParams {
  username?: string;
  userId?: string;
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  birth?: string;
  refererId?: string;
  authenticationType?: string;
  authenticationTypeId?: string;
}

export interface DeleteUserParams {
  username?: string;
  userId?: string;
}

export interface SignInUserParams {
  username?: string;
  password?: string;
  authenticationType?: string;
  authenticationTypeId?: string;
  code?: string;
  codeVerifier?: string;
}

export interface UpdatePasswordParams {
  password: string;
  username?: string;
  userId?: string;
}

export interface ResetPasswordParams {
  code: string;
  codeId: string;
  password: string;
}

export interface UpdateStatusParams {
  status: 'active' | 'suspended' | 'pending' | 'deleted';
  username?: string;
  userId?: string;
}

export interface UpdateTypeParams {
  type: string;
  username?: string;
  userId?: string;
}

export interface SendVerificationCodeParams {
  username?: string;
  userId?: string;
}

export interface ValidateCodeParams {
  code: string;
  codeId: string;
}

/**
 * User Management resource for CRUD operations on application users
 */
export class UserManagementResource extends BaseResource {
  /**
   * Create a new app user
   */
  async create(params: CreateUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.email) data.email = params.email;
    if (params.username) data.username = params.username;
    if (params.firstName) data.first_name = params.firstName;
    if (params.middleName) data.middle_name = params.middleName;
    if (params.lastName) data.last_name = params.lastName;
    if (params.phone) data.phone = params.phone;
    if (params.birth) data.birth = params.birth;
    if (params.password) data.password = params.password;
    if (params.refererId) data.referer_id = params.refererId;
    if (params.authenticationType) data.authentication_type = params.authenticationType;
    if (params.authenticationTypeId) data.authentication_type_id = params.authenticationTypeId;

    return this.client.makeRequest('POST', '/app/users/', data);
  }

  /**
   * Get a single user's details
   */
  async get(params: GetUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;
    if (params.authenticationType) data.authentication_type = params.authenticationType;
    if (params.authenticationTypeId) data.authentication_type_id = params.authenticationTypeId;

    return this.client.makeRequest('POST', '/app/users/get_app_user/', data);
  }

  /**
   * List all app users (paginated)
   */
  async list(page: number = 1, limit: number = 20): Promise<any> {
    const data = { page, limit };
    return this.client.makeRequest('POST', '/app/users/get_app_users/', data);
  }

  /**
   * Update user details
   */
  async update(params: UpdateUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;
    if (params.email) data.email = params.email;
    if (params.firstName) data.first_name = params.firstName;
    if (params.middleName) data.middle_name = params.middleName;
    if (params.lastName) data.last_name = params.lastName;
    if (params.phone) data.phone = params.phone;
    if (params.birth) data.birth = params.birth;
    if (params.refererId) data.referer_id = params.refererId;
    if (params.authenticationType) data.authentication_type = params.authenticationType;
    if (params.authenticationTypeId) data.authentication_type_id = params.authenticationTypeId;

    return this.client.makeRequest('POST', '/app/users/update_app_user/', data);
  }

  /**
   * Delete a user
   */
  async delete(params: DeleteUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    return this.client.makeRequest('POST', '/app/users/delete_app_user/', data);
  }

  /**
   * Check if a user exists
   */
  async exists(params: GetUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;
    if (params.authenticationType) data.authentication_type = params.authenticationType;
    if (params.authenticationTypeId) data.authentication_type_id = params.authenticationTypeId;

    return this.client.makeRequest('POST', '/app/users/check_if_app_user_exists/', data);
  }

  /**
   * Sign in a user
   */
  async signIn(params: SignInUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.password) data.password = params.password;
    if (params.authenticationType) data.authentication_type = params.authenticationType;
    if (params.authenticationTypeId) data.authentication_type_id = params.authenticationTypeId;
    if (params.code) data.code = params.code;
    if (params.codeVerifier) data.code_verifier = params.codeVerifier;

    return this.client.makeRequest('POST', '/app/users/sign_app_user_in/', data);
  }

  /**
   * Sign out a user
   */
  async signOut(refreshToken: string): Promise<any> {
    const data = { refresh_token: refreshToken };
    return this.client.makeRequest('POST', '/app/users/sign_app_user_out/', data);
  }

  /**
   * Refresh user session token
   */
  async refreshToken(refresh: string): Promise<any> {
    const data = { refresh };
    return this.client.makeRequest('POST', '/app/users/refresh_signin_token/', data);
  }

  /**
   * Verify if a session token is valid
   */
  async verifyToken(token: string): Promise<any> {
    const data = { token };
    return this.client.makeRequest('POST', '/app/users/verify_signin_token/', data);
  }

  /**
   * Update user password (admin action)
   */
  async updatePassword(params: UpdatePasswordParams): Promise<any> {
    const data: Record<string, any> = { password: params.password };
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    return this.client.makeRequest('POST', '/app/users/update_app_user_password/', data);
  }

  /**
   * Reset password using verification code (self-service)
   */
  async resetPassword(params: ResetPasswordParams): Promise<any> {
    const data = {
      code: params.code,
      code_id: params.codeId,
      password: params.password,
    };
    return this.client.makeRequest('POST', '/app/users/reset_password_for_app_user/', data);
  }

  /**
   * Update user status
   */
  async updateStatus(params: UpdateStatusParams): Promise<any> {
    const data: Record<string, any> = { status: params.status };
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    return this.client.makeRequest('POST', '/app/users/update_app_user_status/', data);
  }

  /**
   * Update user type/role
   */
  async updateType(params: UpdateTypeParams): Promise<any> {
    const data: Record<string, any> = { type: params.type };
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    return this.client.makeRequest('POST', '/app/users/update_app_user_type/', data);
  }

  /**
   * Reactivate a deactivated user
   */
  async reactivate(params: DeleteUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    return this.client.makeRequest('POST', '/app/users/reactivate_app_user/', data);
  }

  /**
   * Send verification code to user's email
   */
  async sendVerificationCode(params: SendVerificationCodeParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    return this.client.makeRequest('POST', '/app/users/send_code_via_email_to_app_user/', data);
  }

  /**
   * Validate verification code sent to email
   */
  async validateVerificationCode(params: ValidateCodeParams): Promise<any> {
    const data = { code: params.code, code_id: params.codeId };
    return this.client.makeRequest('POST', '/app/users/validate_code_via_email_for_app_user/', data);
  }

  /**
   * Exchange authorization code for user session data (OAuth PKCE flow)
   *
   * This is used after a user authenticates through EagleBirth Auth UI.
   * The Auth UI redirects back to your app with a 'code', and you exchange
   * it for the user's information and session tokens.
   *
   * @param code Authorization code from OAuth redirect
   * @param codeVerifier PKCE code verifier that matches the code_challenge
   * @returns User session data with access/refresh tokens and user information
   */
  async exchangeCodeForUser(code: string, codeVerifier: string): Promise<any> {
    const data = { code, code_verifier: codeVerifier };
    return this.client.makeRequest('POST', '/app/users/sign_app_user_in/', data);
  }
}
