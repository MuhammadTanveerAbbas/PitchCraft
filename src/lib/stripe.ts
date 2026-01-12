import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
});

export const PREMIUM_PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_1SoK146B9UGv8MwbwuzuXblx';
