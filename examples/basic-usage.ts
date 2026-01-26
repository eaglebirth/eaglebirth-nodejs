/**
 * Basic usage examples for the EagleBirth Node.js SDK
 */

import {
  EagleBirth,
  EagleBirthError,
  AuthenticationError,
  APIError,
  ValidationError,
} from '../src';

// Initialize the client with your API key
const client = new EagleBirth('eb_test_your_api_key_here');

async function sendEmailExample() {
  console.log('Sending email...');
  const response = await client.email.send({
    email: 'user@example.com',
    subject: 'Welcome to EagleBirth!',
    message: 'Thank you for signing up for our service.',
    replyTo: 'support@myapp.com',
  });
  console.log('Email sent:', response);
}

async function sendSMSExample() {
  console.log('Sending SMS...');
  const response = await client.sms.send({
    phoneNumber: '+1234567890',
    message: 'Your verification code is 123456',
  });
  console.log('SMS sent:', response);
}

async function sendWhatsAppExample() {
  console.log('Sending WhatsApp message...');
  const response = await client.whatsapp.send({
    phoneNumber: '+1234567890',
    message: 'Hello from EagleBirth!',
  });
  console.log('WhatsApp message sent:', response);
}

async function otpFlowExample() {
  console.log('OTP Flow Example...');

  // Send OTP
  const result = await client.otp.send({
    validationType: 'email',
    email: 'user@example.com',
    codeLength: 6,
    timeout: 180,
  });
  const codeId = result.code_id;
  console.log(`OTP sent with code_id: ${codeId}`);

  // In a real application, user would enter the code
  const userCode = '123456';

  // Validate OTP
  const validation = await client.otp.validate({
    codeId: codeId,
    code: userCode,
  });
  console.log('Validation result:', validation);

  // Check if validated
  const status = await client.otp.checkValidated(codeId);
  console.log('Validation status:', status);
}

async function generateQRExample() {
  console.log('Generating QR code...');
  const qr = await client.qr.generate({
    text: 'https://eaglebirth.com',
    color: '#000000',
    backgroundColor: '#FFFFFF',
  });
  console.log('QR code generated:', qr);
}

async function visionAIExample() {
  console.log('Vision AI Examples...');

  // Extract face details
  const details = await client.vision.extractFaceDetails({
    image: '/path/to/photo.jpg',
    imageType: 'object',
  });
  console.log('Face details:', details);

  // Compare two faces
  const comparison = await client.vision.compareFaces({
    image1: '/path/to/photo1.jpg',
    image2: '/path/to/photo2.jpg',
    image1Type: 'object',
    image2Type: 'object',
  });
  console.log('Face comparison:', comparison);

  // OCR - Extract text from image
  const text = await client.vision.extractText({
    image: '/path/to/document.jpg',
    imageType: 'object',
  });
  console.log('Extracted text:', text);
}

async function errorHandlingExample() {
  console.log('Error Handling Example...');

  try {
    await client.email.send({
      email: 'invalid-email',
      subject: 'Test',
      message: 'Hello!',
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Authentication error:', error.message);
    } else if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
    } else if (error instanceof APIError) {
      console.error('API error:', error.message);
      console.error('Status code:', error.statusCode);
    } else if (error instanceof EagleBirthError) {
      console.error('Error:', error.message);
    }
  }
}

// Main execution
async function main() {
  console.log('EagleBirth SDK Examples');
  console.log('========================\n');

  // Uncomment the examples you want to run:
  // await sendEmailExample();
  // await sendSMSExample();
  // await sendWhatsAppExample();
  // await otpFlowExample();
  // await generateQRExample();
  // await visionAIExample();
  // await errorHandlingExample();

  console.log('\nDone!');
}

main().catch(console.error);
