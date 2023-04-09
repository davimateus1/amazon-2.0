import Stripe from 'stripe';

export type ProductProps = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  hasPrime?: boolean;
};

export type OrderProps = {
  id: string;
  amount: number;
  amount_shipping: number;
  images: Array<string>;
  timestamp: number;
  items: Array<ItemProps>;
};

export type ItemProps = {
  id: string;
  object: string;
  amount_discount: number;
  amount_subtotal: number;
  amount_tax: number;
  amount_total: number;
  currency: string;
  description: string;
  price: Array<PriceProps>;
  quantity: number;
};

type PriceProps = {
  id: string;
  object: string;
  active: false;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: null;
  livemode: boolean;
  lookup_key: null;
  metadata: object;
  nickname: null;
  product: string;
  recurring: null;
  tax_behavior: string;
  tiers_mode: null;
  transform_quantity: null;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
};

export type Session = Stripe.Checkout.Session;

export interface CustomHeaders extends Headers {
  'stripe-signature': string;
}
