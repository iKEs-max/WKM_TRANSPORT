import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize the Twilio client only if credentials are provided
const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

/**
 * Sends an SMS message using Twilio.
 * If Twilio credentials are not set up in the environment, it securely logs the message content
 * to the console instead of crashing, allowing development and testing to continue.
 * 
 * @param to The recipient's phone number
 * @param message The text content of the SMS
 */
export const sendSMS = async (to: string, message: string): Promise<boolean> => {
  try {
    if (!client || !twilioPhoneNumber) {
      console.log('--------------------------------------------------');
      console.log(`[SMS MOCK] To: ${to}`);
      console.log(`[SMS MOCK] Message: \n${message}`);
      console.log('--------------------------------------------------');
      console.log('Note: To send real SMS, define TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER in .env');
      return true; // Pretend it succeeded
    }

    const result = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to,
    });

    console.log(`[SMS SENT] Successfully sent SMS to ${to}. SID: ${result.sid}`);
    return true;
  } catch (error) {
    console.error(`[SMS ERROR] Failed to send SMS to ${to}:`, error);
    return false;
  }
};
