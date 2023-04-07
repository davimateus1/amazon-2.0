import Stripe from 'stripe';

export type ProductProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  hasPrime?: boolean;
};

export type Session = Stripe.Checkout.Session;

export interface CustomHeaders extends Headers {
  'stripe-signature': string;
}
