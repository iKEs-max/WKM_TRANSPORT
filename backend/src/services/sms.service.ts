import https from 'https';
import querystring from 'querystring';

const apiKey = process.env.SMS_MOBILE_API_KEY;

const normalizePhoneNumber = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '233' + cleaned.substring(1);
  }
  return cleaned;
};

/**
 * Sends an SMS message using SMSMobileAPI.com
 * If API key is not set up in the environment, it securely logs the message content
 * to the console instead of crashing, allowing development and testing to continue.
 * 
 * @param to The recipient's phone number
 * @param message The text content of the SMS
 */
export const sendSMS = async (to: string, message: string): Promise<boolean> => {
  const normalizedTo = normalizePhoneNumber(to);
  try {
    if (!apiKey) {
      console.log('--------------------------------------------------');
      console.log(`[SMS MOCK] To: ${normalizedTo}`);
      console.log(`[SMS MOCK] Message: \n${message}`);
      console.log('--------------------------------------------------');
      console.log('Note: To send real SMS, define SMS_MOBILE_API_KEY in .env');
      return true; // Pretend it succeeded
    }

    const params = querystring.stringify({
      apikey: apiKey,
      recipients: normalizedTo,
      message: message,
    });

    const url = `https://api.smsmobileapi.com/sendsms/?${params}`;

    return new Promise((resolve) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          console.log(`[SMS SENT] SMSMobileAPI Response: ${data}`);
          resolve(true);
        });
      }).on('error', (err) => {
        console.error(`[SMS ERROR] Failed to send SMS via SMSMobileAPI:`, err);
        resolve(false);
      });
    });
  } catch (error) {
    console.error(`[SMS ERROR] Unexpected failure sending SMS to ${to}:`, error);
    return false;
  }
};
