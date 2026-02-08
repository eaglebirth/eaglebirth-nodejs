import { BaseResource } from './base';
import { APIError } from '../exceptions';

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
   *
   * @param params - User creation parameters
   * @returns API response with user creation data
   * @throws {APIError} If user creation fails
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

    try {
      const response = await this.client.makeRequest('POST', '/app/users/', data);
      console.log(`[EagleBirth] Successfully created user: ${params.username || params.email}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to create user:`, error);
      throw new APIError(`Failed to create user: ${error}`, 0);
    }
  }

  /**
   * Get a single user's details
   *
   * @param params - User lookup parameters
   * @returns User details from the API
   * @throws {APIError} If user retrieval fails
   */
  async get(params: GetUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;
    if (params.authenticationType) data.authentication_type = params.authenticationType;
    if (params.authenticationTypeId) data.authentication_type_id = params.authenticationTypeId;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/get_app_user/', data);
      console.log(`[EagleBirth] Successfully retrieved user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to retrieve user:`, error);
      throw new APIError(`Failed to retrieve user: ${error}`, 0);
    }
  }

  /**
   * List all app users (paginated)
   *
   * @param page - Page number (default: 1)
   * @param limit - Number of users per page (default: 20)
   * @returns Paginated list of users
   * @throws {APIError} If listing users fails
   */
  async list(page: number = 1, limit: number = 20): Promise<any> {
    const data = { page, limit };
    try {
      const response = await this.client.makeRequest('POST', '/app/users/get_app_users/', data);
      console.log(`[EagleBirth] Successfully retrieved users list (page ${page})`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to list users:`, error);
      throw new APIError(`Failed to list users: ${error}`, 0);
    }
  }

  /**
   * Update user details
   *
   * @param params - User update parameters
   * @returns API response with updated user data
   * @throws {APIError} If user update fails
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

    try {
      const response = await this.client.makeRequest('POST', '/app/users/update_app_user/', data);
      console.log(`[EagleBirth] Successfully updated user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to update user:`, error);
      throw new APIError(`Failed to update user: ${error}`, 0);
    }
  }

  /**
   * Delete a user
   *
   * @param params - User deletion parameters
   * @returns API response confirming deletion
   * @throws {APIError} If user deletion fails
   */
  async delete(params: DeleteUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/delete_app_user/', data);
      console.log(`[EagleBirth] Successfully deleted user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to delete user:`, error);
      throw new APIError(`Failed to delete user: ${error}`, 0);
    }
  }

  /**
   * Check if a user exists
   *
   * @param params - User lookup parameters
   * @returns API response with existence status
   * @throws {APIError} If existence check fails
   */
  async exists(params: GetUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;
    if (params.authenticationType) data.authentication_type = params.authenticationType;
    if (params.authenticationTypeId) data.authentication_type_id = params.authenticationTypeId;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/check_if_app_user_exists/', data);
      console.log(`[EagleBirth] Checked existence for user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to check user existence:`, error);
      throw new APIError(`Failed to check user existence: ${error}`, 0);
    }
  }

  /**
   * Sign in a user
   *
   * @param params - Sign-in parameters
   * @returns API response with access and refresh tokens
   * @throws {APIError} If sign-in fails
   */
  async signIn(params: SignInUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.password) data.password = params.password;
    if (params.authenticationType) data.authentication_type = params.authenticationType;
    if (params.authenticationTypeId) data.authentication_type_id = params.authenticationTypeId;
    if (params.code) data.code = params.code;
    if (params.codeVerifier) data.code_verifier = params.codeVerifier;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/sign_app_user_in/', data);
      console.log(`[EagleBirth] Successfully signed in user: ${params.username || params.authenticationType}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to sign in user:`, error);
      throw new APIError(`Failed to sign in user: ${error}`, 0);
    }
  }

  /**
   * Sign out a user
   *
   * @param refreshToken - Refresh token to invalidate
   * @returns API response confirming sign-out
   * @throws {APIError} If sign-out fails
   */
  async signOut(refreshToken: string): Promise<any> {
    const data = { refresh_token: refreshToken };
    try {
      const response = await this.client.makeRequest('POST', '/app/users/sign_app_user_out/', data);
      console.log(`[EagleBirth] Successfully signed out user`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to sign out user:`, error);
      throw new APIError(`Failed to sign out user: ${error}`, 0);
    }
  }

  /**
   * Refresh user session token
   *
   * @param refresh - Refresh token
   * @returns API response with new access token
   * @throws {APIError} If token refresh fails
   */
  async refreshToken(refresh: string): Promise<any> {
    const data = { refresh };
    try {
      const response = await this.client.makeRequest('POST', '/app/users/refresh_signin_token/', data);
      console.log(`[EagleBirth] Successfully refreshed user token`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to refresh token:`, error);
      throw new APIError(`Failed to refresh token: ${error}`, 0);
    }
  }

  /**
   * Verify if a session token is valid
   *
   * @param token - Access token to verify
   * @returns API response with verification status
   * @throws {APIError} If token verification fails
   */
  async verifyToken(token: string): Promise<any> {
    const data = { token };
    try {
      const response = await this.client.makeRequest('POST', '/app/users/verify_signin_token/', data);
      console.log(`[EagleBirth] Successfully verified token`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to verify token:`, error);
      throw new APIError(`Failed to verify token: ${error}`, 0);
    }
  }

  /**
   * Update user password (admin action)
   *
   * @param params - Password update parameters
   * @returns API response confirming password update
   * @throws {APIError} If password update fails
   */
  async updatePassword(params: UpdatePasswordParams): Promise<any> {
    const data: Record<string, any> = { password: params.password };
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/update_app_user_password/', data);
      console.log(`[EagleBirth] Successfully updated password for user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to update password:`, error);
      throw new APIError(`Failed to update password: ${error}`, 0);
    }
  }

  /**
   * Reset password using verification code (self-service)
   *
   * @param params - Password reset parameters
   * @returns API response confirming password reset
   * @throws {APIError} If password reset fails
   */
  async resetPassword(params: ResetPasswordParams): Promise<any> {
    const data = {
      code: params.code,
      code_id: params.codeId,
      password: params.password,
    };
    try {
      const response = await this.client.makeRequest('POST', '/app/users/reset_password_for_app_user/', data);
      console.log(`[EagleBirth] Successfully reset password`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to reset password:`, error);
      throw new APIError(`Failed to reset password: ${error}`, 0);
    }
  }

  /**
   * Update user status
   *
   * @param params - Status update parameters
   * @returns API response confirming status update
   * @throws {APIError} If status update fails
   */
  async updateStatus(params: UpdateStatusParams): Promise<any> {
    const data: Record<string, any> = { status: params.status };
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/update_app_user_status/', data);
      console.log(`[EagleBirth] Successfully updated status to '${params.status}' for user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to update status:`, error);
      throw new APIError(`Failed to update status: ${error}`, 0);
    }
  }

  /**
   * Update user type/role
   *
   * @param params - Type update parameters
   * @returns API response confirming type update
   * @throws {APIError} If type update fails
   */
  async updateType(params: UpdateTypeParams): Promise<any> {
    const data: Record<string, any> = { type: params.type };
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/update_app_user_type/', data);
      console.log(`[EagleBirth] Successfully updated type to '${params.type}' for user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to update type:`, error);
      throw new APIError(`Failed to update type: ${error}`, 0);
    }
  }

  /**
   * Reactivate a deactivated user
   *
   * @param params - User identification parameters
   * @returns API response confirming reactivation
   * @throws {APIError} If reactivation fails
   */
  async reactivate(params: DeleteUserParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/reactivate_app_user/', data);
      console.log(`[EagleBirth] Successfully reactivated user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to reactivate user:`, error);
      throw new APIError(`Failed to reactivate user: ${error}`, 0);
    }
  }

  /**
   * Send verification code to user's email
   *
   * @param params - User identification parameters
   * @returns API response with code_id
   * @throws {APIError} If sending verification code fails
   */
  async sendVerificationCode(params: SendVerificationCodeParams): Promise<any> {
    const data: Record<string, any> = {};
    if (params.username) data.username = params.username;
    if (params.userId) data.user_id = params.userId;

    try {
      const response = await this.client.makeRequest('POST', '/app/users/send_code_via_email_to_app_user/', data);
      console.log(`[EagleBirth] Successfully sent verification code to user: ${params.username || params.userId}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to send verification code:`, error);
      throw new APIError(`Failed to send verification code: ${error}`, 0);
    }
  }

  /**
   * Validate verification code sent to email
   *
   * @param params - Validation parameters
   * @returns API response with validation status
   * @throws {APIError} If code validation fails
   */
  async validateVerificationCode(params: ValidateCodeParams): Promise<any> {
    const data = { code: params.code, code_id: params.codeId };
    try {
      const response = await this.client.makeRequest('POST', '/app/users/validate_code_via_email_for_app_user/', data);
      console.log(`[EagleBirth] Successfully validated verification code`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to validate verification code:`, error);
      throw new APIError(`Failed to validate verification code: ${error}`, 0);
    }
  }

  /**
   * Exchange authorization code for user session data (OAuth PKCE flow)
   *
   * This is used after a user authenticates through EagleBirth Auth UI.
   * The Auth UI redirects back to your app with a 'code', and you exchange
   * it for the user's information and session tokens.
   *
   * @param code - Authorization code from OAuth redirect
   * @param codeVerifier - PKCE code verifier that matches the code_challenge
   * @returns User session data with access/refresh tokens and user information
   * @throws {APIError} If code exchange fails
   */
  async exchangeCodeForUser(code: string, codeVerifier: string): Promise<any> {
    const payload = {
      code,
      code_verifier: codeVerifier,
    };

    try {
      const response = await this.client.makeRequest('POST', '/app/users/sign_app_user_in/', payload);

      // Extract user data from response
      const userInfo = response.data || {};

      console.log(`[EagleBirth] Successfully exchanged code for user: ${userInfo.email}`);
      return response;
    } catch (error) {
      console.error(`[EagleBirth] Failed to exchange code for user:`, error);
      throw new APIError(`Failed to exchange authorization code: ${error}`, 0);
    }
  }
}
