import moment from 'moment';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/react';
import Stripe from 'stripe';

import db from '../../firebase';
import { Header, Order } from '../components';

import { OrderProps } from '@/types';

const Orders = ({ orders }: { orders: OrderProps[] }): JSX.Element => {
  const { data } = useSession();

  return (
    <div className='bg-gray-100 h-screen'>
      <Head>
        <title>Amazon 2.0 - Orders</title>
      </Head>
      <Header />

      <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-3xl border-b pb-1 border-yellow-400'>Your Orders</h1>

        {data ? <h2>{orders?.length ?? 0} Orders</h2> : <h2>Please sign in to see your orders</h2>}

        <div className='mt-5 space-y-4'>
          {orders?.map((order) => (
            <Order order={order} key={order.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
  });

  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  const stripeOrders = await db
    .collection('users')
    .doc(session.user?.email ?? '')
    .collection('orders')
    .orderBy('timestamp', 'desc')
    .get();

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amount_shipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    })),
  );

  return {
    props: {
      orders,
    },
  };
};

export default Orders;
