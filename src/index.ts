export { EagleBirth } from './client';
export type { EagleBirthConfig } from './client';

export {
  EagleBirthError,
  AuthenticationError,
  APIError,
  ValidationError,
  RateLimitError,
} from './exceptions';

export {
  EmailResource,
  SMSResource,
  WhatsAppResource,
  OTPResource,
  QRCodeResource,
  VisionResource,
  StorageResource,
  UserManagementResource,
} from './resources';

export type {
  SendEmailParams,
  SendSMSParams,
  SendWhatsAppParams,
  SendOTPParams,
  ValidateOTPParams,
  ValidationType,
  GenerateQRParams,
  ExtractFaceDetailsParams,
  CompareFacesParams,
  ExtractTextParams,
  ImageType,
  CreateDirectoryParams,
  DeleteDirectoryParams,
  ListDirectoryParams,
  UpdateDirectoryPasswordParams,
  UpdateDirectoryPrivacyParams,
  UploadFileParams,
  RetrieveFileParams,
  DeleteFileParams,
  UpdateFilePasswordParams,
  UpdateFilePrivacyParams,
  CreateUserParams,
  GetUserParams,
  UpdateUserParams,
  DeleteUserParams,
  SignInUserParams,
  UpdatePasswordParams,
  ResetPasswordParams,
  UpdateStatusParams,
  UpdateTypeParams,
  SendVerificationCodeParams,
  ValidateCodeParams,
} from './resources';
