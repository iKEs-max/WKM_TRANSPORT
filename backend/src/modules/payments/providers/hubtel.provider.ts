import axios from 'axios';
import { PaymentInitResult, PaymentProvider, PaymentVerificationResult } from '../payment.types';

export class HubtelProvider implements PaymentProvider {
  private merchantId = process.env.HUBTEL_MERCHANT_ID;
  private apiKey = process.env.HUBTEL_API_KEY;
  private callbackUrl = process.env.HUBTEL_CALLBACK_URL;
  private returnUrl = process.env.HUBTEL_RETURN_URL;

  async initializePayment(
    amount: number,
    currency: string,
    reference: string,
    _customerData: any
  ): Promise<PaymentInitResult> {
    if (!this.merchantId || !this.apiKey) {
      // Fallback to fake if not configured (useful for initial dev)
      console.warn('[Hubtel] MERCHANT_ID or API_KEY not set. Falling back to MOCK.');
      return {
        success: true,
        authorizationUrl: `https://checkout.hubtel.com/mock/${reference}`,
        reference,
      };
    }

    try {
      const auth = Buffer.from(`${this.merchantId}:${this.apiKey}`).toString('base64');
      const response = await axios.post(
        `https://api-checkout-v2.hubtel.com/v1/merchantaccount/merchants/${this.merchantId}/checkout/initiate`,
        {
          totalAmount: amount,
          description: `WKM Transport Booking - ${reference}`,
          callbackUrl: this.callbackUrl,
          returnUrl: this.returnUrl,
          clientReference: reference,
          items: [
            {
              name: 'Bus Ticket',
              quantity: 1,
              unitPrice: amount,
            },
          ],
        },
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.responseCode === '00') {
        return {
          success: true,
          authorizationUrl: response.data.data.checkoutDirectUrl || response.data.data.checkoutUrl,
          reference,
        };
      }

      return { success: false, reference };
    } catch (error: any) {
      console.error('[Hubtel] Initialization Failed:', error.response?.data || error.message);
      return { success: false, reference };
    }
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
    if (!this.merchantId || !this.apiKey) {
      return { success: true, status: 'SUCCESS', amount: 0, currency: 'GHS' };
    }

    try {
      const auth = Buffer.from(`${this.merchantId}:${this.apiKey}`).toString('base64');
      const response = await axios.get(
        `https://api-checkout-v2.hubtel.com/v1/merchantaccount/merchants/${this.merchantId}/checkout/invoice/status?clientReference=${reference}`,
        {
          headers: { Authorization: `Basic ${auth}` },
        }
      );

      const status = response.data.data.status;
      return {
        success: true,
        status: status === 'Success' ? 'SUCCESS' : status === 'Failed' ? 'FAILED' : 'PENDING',
        amount: response.data.data.amount,
        currency: 'GHS',
      };
    } catch (error: any) {
      console.error('[Hubtel] Verification Failed:', error.response?.data || error.message);
      return { success: false, status: 'PENDING', amount: 0, currency: 'GHS' };
    }
  }
}

// Rename the old class or keep it for tests
export class FakeHubtelProvider implements PaymentProvider {
  async initializePayment(
    amount: number,
    currency: string,
    reference: string
  ): Promise<PaymentInitResult> {
    console.log(`[Hubtel MOCK] Initializing for ${amount} ${currency}`);
    return {
      success: true,
      authorizationUrl: `https://checkout.hubtel.com/mock/${reference}`,
      reference,
    };
  }

  async verifyPayment(reference: string): Promise<PaymentVerificationResult> {
    return {
      success: true,
      status: 'SUCCESS',
      amount: 0,
      currency: 'GHS',
    };
  }
}
