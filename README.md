# EagleBirth Node.js SDK

Official Node.js/TypeScript SDK for the EagleBirth API.

## Installation

```bash
npm install @eaglebirth/sdk
```

or with yarn:

```bash
yarn add @eaglebirth/sdk
```

## Requirements

- Node.js 14.0.0 or higher

## Quick Start

```typescript
import { EagleBirth } from '@eaglebirth/sdk';

// Initialize the client
const client = new EagleBirth('eb_test_your_api_key_here');

// Send an email
const response = await client.email.send({
  email: 'user@example.com',
  subject: 'Welcome!',
  message: 'Thank you for signing up.',
});

console.log(response);
```

## Authentication

Get your API key from [https://eaglebirth.com](https://eaglebirth.com) > Dashboard > Apps > API Keys

```typescript
// Test environment - automatically routes to sandbox.eaglebirth.com
const client = new EagleBirth('eb_test_...');

// Production environment - automatically routes to eaglebirth.com
const client = new EagleBirth('eb_live_...');

// With custom configuration (overrides automatic detection)
const client = new EagleBirth({
  apiKey: 'eb_test_...',
  baseUrl: 'https://custom-api.example.com/api',
  timeout: 60000, // 60 seconds
});
```

## Environments

The SDK automatically routes requests to the correct environment based on your API key prefix:

- **Sandbox/Test** (`eb_test_...`) - Routes to `sandbox.eaglebirth.com`. For development and testing. No charges, uses test data.
- **Production** (`eb_live_...`) - Routes to `eaglebirth.com`. For live applications. Real charges apply.

No additional configuration needed - just use the appropriate API key and the SDK will automatically connect to the right server. You can create separate API keys for each environment from your dashboard.

## Usage Examples

### Email

```typescript
// Send a simple email
await client.email.send({
  email: 'user@example.com',
  subject: 'Welcome to our service',
  message: 'Thank you for joining us!',
});

// Send with custom reply-to and header
await client.email.send({
  email: 'user@example.com',
  subject: 'Account Verification',
  message: 'Please verify your email address.',
  replyTo: 'support@myapp.com',
  header: 'MyApp Verification',
});
```

### SMS

```typescript
// Send an SMS
await client.sms.send({
  phoneNumber: '+1234567890',
  message: 'Your verification code is 123456',
});

// Get SMS pricing
const prices = await client.sms.getPrices('+1234567890');
console.log(prices);
```

### WhatsApp

```typescript
// Send a WhatsApp message
await client.whatsapp.send({
  phoneNumber: '+1234567890',
  message: 'Hello from EagleBirth!',
  template: 'normal_message',
});
```

### OTP (One-Time Passwords)

```typescript
// Send OTP via email
const result = await client.otp.send({
  validationType: 'email',
  email: 'user@example.com',
  codeLength: 6,
  timeout: 180,
  trials: 3,
});
const codeId = result.code_id;

// Validate the OTP
const validation = await client.otp.validate({
  codeId: codeId,
  code: '123456',
});

// Check if code was validated
const status = await client.otp.checkValidated(codeId);
```

### QR Code Generation

```typescript
import { readFileSync } from 'fs';

// Generate a simple QR code
const qr = await client.qr.generate({
  text: 'https://example.com',
});

// Generate with custom colors and logo (file path)
const qr = await client.qr.generate({
  text: 'https://example.com',
  image: '/path/to/logo.png',
  imageType: 'object',
  color: '#000000',
  backgroundColor: '#FFFFFF',
  qrType: 'rounded',
});

// Generate with logo from Buffer
const logoBuffer = readFileSync('/path/to/logo.png');
const qr = await client.qr.generate({
  text: 'https://example.com',
  image: logoBuffer,
  imageType: 'object',
});

// Generate with logo from URL
const qr = await client.qr.generate({
  text: 'https://example.com',
  image: 'https://example.com/logo.png',
  imageType: 'link',
});
```

### Vision AI

```typescript
import { readFileSync } from 'fs';

// Extract face details from an image file
const details = await client.vision.extractFaceDetails({
  image: '/path/to/photo.jpg',
  imageType: 'object',
});

// Extract face details from Buffer
const imageBuffer = readFileSync('/path/to/photo.jpg');
const details = await client.vision.extractFaceDetails({
  image: imageBuffer,
  imageType: 'object',
});

// Extract face details from image URL
const details = await client.vision.extractFaceDetails({
  image: 'https://example.com/photo.jpg',
  imageType: 'link',
});

// Compare two faces
const comparison = await client.vision.compareFaces({
  image1: '/path/to/photo1.jpg',
  image2: '/path/to/photo2.jpg',
  image1Type: 'object',
  image2Type: 'object',
});

// Extract text from image (OCR)
const text = await client.vision.extractText({
  image: '/path/to/document.jpg',
  imageType: 'object',
});
```

### Cloud Storage

```typescript
import { readFileSync } from 'fs';

// Create a directory
await client.storage.directory.create({
  path: '/photos/vacation/',
  private: 'yes',  // 'yes' or 'no'
  directoryPassword: 'secret123',  // Optional password protection
});

// Upload a file
const fileBuffer = readFileSync('/path/to/document.pdf');
const uploadResult = await client.storage.file.upload({
  file: fileBuffer,  // Can also be a file path string
  path: '/documents/report.pdf',
  private: 'no',
  filePassword: 'filepass123',  // Optional file password
});

// List directory contents
const contents = await client.storage.directory.listContent({
  path: '/photos/vacation/',
  directoryPassword: 'secret123',  // If directory is password protected
});

contents.data.directories.forEach((dir: any) => {
  console.log(`Directory: ${dir.path}`);
});

contents.data.files.forEach((file: any) => {
  console.log(`File: ${file.filename} - ${file.size} bytes`);
});

// Retrieve a file
const fileData = await client.storage.file.retrieve({
  path: '/documents/report.pdf',
  password: 'filepass123',  // If file is password protected
});

// Update file privacy
await client.storage.file.updatePrivacy({
  path: '/documents/report.pdf',
  private: 'yes',
  refreshToken: 'yes',  // Generate new access token
});

// Update directory password
await client.storage.directory.updatePassword({
  path: '/photos/vacation/',
  directoryPassword: 'newsecret456',
});

// Delete a file
await client.storage.file.delete({ path: '/documents/old_report.pdf' });

// Delete a directory
await client.storage.directory.delete({ path: '/photos/old_vacation/' });
```

### User Management

**Manage your application's end users.** All operations use your API key (no additional authentication needed).

```typescript
// Note: The client is already authenticated with your API key.
// User Management operates on your app's users.

```typescript
// Create a new user
const user = await client.users.create({
  email: 'newuser@example.com',
  username: 'johndoe',
  firstName: 'John',
  lastName: 'Doe',
  password: 'securepassword123',
  phone: '+1234567890',
});
console.log(`User created with ID: ${user.data.user_id}`);

// Check if a user exists
const exists = await client.users.exists({ username: 'johndoe' });
if (exists.data.exists) {
  console.log('User exists!');
}

// Get user details
const userDetails = await client.users.get({ username: 'johndoe' });
console.log(`User email: ${userDetails.data.email}`);

// List all users (paginated)
const users = await client.users.list(1, 10);
users.data.users.forEach((user: any) => {
  console.log(`${user.username} - ${user.email}`);
});

// Update user details
await client.users.update({
  username: 'johndoe',
  email: 'newemail@example.com',
  firstName: 'Jonathan',
});

// Sign in a user (classic username/password)
const signinResult = await client.users.signIn({
  username: 'johndoe',
  password: 'securepassword123',
});
const accessToken = signinResult.data.access;
const refreshToken = signinResult.data.refresh;

// Sign in with third-party auth (e.g., Google, Facebook)
const signinResult2 = await client.users.signIn({
  authenticationType: 'google',
  authenticationTypeId: 'google_user_id_12345',
});

// OAuth PKCE Flow with EagleBirth Auth UI
// After user authenticates via EagleBirth Auth UI, you'll receive a 'code'
// Exchange the code for user session and data
const userSession = await client.users.exchangeCodeForUser(
  'authorization_code_from_redirect',
  'your_code_verifier'
);
console.log(`User email: ${userSession.data.email}`);
console.log(`Access token: ${userSession.data.access}`);
console.log(`User ID: ${userSession.data.user_id}`);

// Verify if a session token is valid
const isValid = await client.users.verifyToken(accessToken);

// Refresh user session token
const newTokens = await client.users.refreshToken(refreshToken);

// Update user password (admin action)
await client.users.updatePassword({
  username: 'johndoe',
  password: 'newpassword456',
});

// Send verification code for password reset
const codeResponse = await client.users.sendVerificationCode({ username: 'johndoe' });
const codeId = codeResponse.data.code_id;

// Validate the verification code
await client.users.validateVerificationCode({
  code: '123456',
  codeId: codeId,
});

// Reset password using verification code (self-service)
await client.users.resetPassword({
  code: '123456',
  codeId: codeId,
  password: 'brandnewpassword789',
});

// Update user status
await client.users.updateStatus({
  username: 'johndoe',
  status: 'suspended',  // Options: 'active', 'suspended', 'pending', 'deleted'
});

// Update user type/role
await client.users.updateType({
  username: 'johndoe',
  type: 'premium',
});

// Reactivate a suspended user
await client.users.reactivate({ username: 'johndoe' });

// Sign out a user (invalidate refresh token)
await client.users.signOut(refreshToken);

// Delete a user
await client.users.delete({ username: 'johndoe' });
```

### OAuth PKCE Flow (EagleBirth Auth UI)

When users authenticate through EagleBirth's hosted Auth UI, you'll receive an authorization code that needs to be exchanged for user data and session tokens.

```typescript
// Step 1: Redirect users to EagleBirth Auth UI with PKCE parameters
// (You generate code_verifier and code_challenge in your app)

// Step 2: After successful authentication, EagleBirth redirects back to your app
// with a 'code' parameter in the URL

// Step 3: Exchange the code for user session data
const userSession = await client.users.exchangeCodeForUser(
  'code_from_url_redirect',
  'your_original_code_verifier'
);

// Access user information
const userData = userSession.data;
console.log(`Email: ${userData.email}`);
console.log(`Username: ${userData.username}`);
console.log(`Name: ${userData.first_name} ${userData.last_name}`);
console.log(`Phone: ${userData.phone}`);
console.log(`User ID: ${userData.user_id}`);

// Access session tokens
const accessToken = userData.access;
const refreshToken = userData.refresh;

// Use the access token for authenticated requests
// Store the refresh token for renewing the session
```

## Error Handling

```typescript
import {
  EagleBirthError,
  AuthenticationError,
  APIError,
  ValidationError,
  RateLimitError,
} from '@eaglebirth/sdk';

try {
  const response = await client.email.send({
    email: 'user@example.com',
    subject: 'Test',
    message: 'Hello!',
  });
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Invalid API key or authentication failed
    console.error('Authentication error:', error.message);
  } else if (error instanceof ValidationError) {
    // Invalid request parameters
    console.error('Validation error:', error.message);
  } else if (error instanceof RateLimitError) {
    // Rate limit exceeded
    console.error('Rate limit error:', error.message);
    console.log('Retry after:', error.retryAfter, 'seconds');
  } else if (error instanceof APIError) {
    // API returned an error
    console.error('API error:', error.message);
    console.error('Status code:', error.statusCode);
    console.error('Response:', error.response);
  } else if (error instanceof EagleBirthError) {
    // General SDK error
    console.error('Error:', error.message);
  }
}
```

## TypeScript Support

This SDK is written in TypeScript and provides complete type definitions:

```typescript
import {
  EagleBirth,
  SendEmailParams,
  SendOTPParams,
  ValidationType,
} from '@eaglebirth/sdk';

const client = new EagleBirth('eb_test_...');

// Full type checking and autocomplete
const emailParams: SendEmailParams = {
  email: 'user@example.com',
  subject: 'Test',
  message: 'Hello!',
};

await client.email.send(emailParams);

// Type-safe validation types
const validationType: ValidationType = 'email';
const otpParams: SendOTPParams = {
  validationType,
  email: 'user@example.com',
};
```

### Cloud Storage

```typescript
// Upload a file
await client.storage.file.upload({
  file: '/path/to/document.pdf',
  path: '/docs/report.pdf',
  private: 'no',
});

// Create a directory
await client.storage.directory.create({
  path: '/photos/vacation/',
  private: 'yes',
});

// List directory contents
const contents = await client.storage.directory.listContent({
  path: '/photos/',
});

// Retrieve a file
const fileData = await client.storage.file.retrieve({
  path: '/docs/report.pdf',
});
```

### Authentication

```typescript
// Sign in with app credentials
const authResponse = await client.auth.signIn({
  clientId: 'your_client_id',
  secretId: 'your_secret_id',
});

// Get user tokens
const tokens = await client.auth.getToken({
  username: 'user@example.com',
  password: 'password123',
});

// Refresh access token
const newToken = await client.auth.refreshToken({
  refresh: 'your_refresh_token',
});
```

## Available Resources

- `client.email` - Email notifications
- `client.sms` - SMS messaging
- `client.whatsapp` - WhatsApp messaging
- `client.otp` - OTP/verification codes
- `client.qr` - QR code generation
- `client.vision` - Vision AI (face detection, OCR, face comparison)
- `client.storage` - Cloud storage (files and directories)
  - `client.storage.file` - File operations
  - `client.storage.directory` - Directory operations
- `client.users` - User management for your app's end users

## Support

- Documentation: [https://eaglebirth.com/developer/documentation](https://eaglebirth.com/developer/documentation)
- Email: contact@eaglebirth.com
- Dashboard: [https://eaglebirth.com](https://eaglebirth.com)

## License

MIT License
