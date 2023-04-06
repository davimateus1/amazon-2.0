import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

import { ProductProps } from '@/types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { items, email } = req.body;

  const transformedItems = items.map((item: ProductProps) => ({
    quantity: 1,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
        description: item.description,
      },
    },
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: transformedItems,
    shipping_options: [
      {
        shipping_rate: 'shr_1Mtw9HLZtbe5f4GfReiv7TMY',
      },
    ],
    shipping_address_collection: {
      allowed_countries: ['GB', 'US', 'CA'],
    },
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item: ProductProps) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
