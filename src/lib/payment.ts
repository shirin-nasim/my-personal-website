import { config } from "@/config";

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export async function createPaymentIntent(
  amount: number,
): Promise<PaymentIntent> {
  // This would normally call your backend to create a Stripe payment intent
  // For now, we'll simulate it
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        clientSecret: "dummy_secret_" + Math.random(),
        amount,
        currency: "usd",
      });
    }, 1000);
  });
}

export async function confirmPayment(clientSecret: string): Promise<boolean> {
  // This would normally use Stripe.js to confirm the payment
  // For now, we'll simulate it
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
