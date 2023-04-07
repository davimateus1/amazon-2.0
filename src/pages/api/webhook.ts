import { IncomingMessage } from 'http';

import * as admin from 'firebase-admin';
import { buffer } from 'micro';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import Stripe from 'stripe';

import serviceAccount from '../../../permissions.json';

import { CustomHeaders, Session } from '@/types';

const service = serviceAccount.auth_provider_x509_cert_url;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(service),
    })
  : admin.app();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

const endpointSecret = process.env.STRIPE_SIGNING_SECRET ?? '';

const fullFillOrder = async (session: Session): Promise<void> => {
  return app
    .firestore()
    .collection('users')
    .doc(session?.metadata?.email ?? '')
    .collection('orders')
    .doc(session.id)
    .set({
      amount: session?.amount_total ?? 0 / 100,
      amount_shipping: session?.total_details?.amount_shipping ?? 0 / 100,
      images: JSON.parse(session?.metadata?.images ?? ''),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      alert(`SUCCESS: Order ${session.id} has been added to the DB`);
    });
};

export default async (req: NextRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    let event: Stripe.Event | null = null;

    const requestBuffer = await buffer(req as unknown as IncomingMessage);
    const payload = requestBuffer.toString();

    const sig = (req.headers as CustomHeaders)['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(`Webhook Error: ${error?.message}`);
      }
    }

    if (event?.type === 'checkout.session.completed') {
      const session = event.data.object as Session;

      return fullFillOrder(session)
        .then(() => res.status(200))
        .catch((error) => {
          if (error instanceof Error) {
            res.status(400).send(`Webhook Error: ${error?.message}`);
          }
        }) as Promise<void>;
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
