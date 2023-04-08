import moment from 'moment';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';
import Stripe from 'stripe';

import db from '../../firebase';
import { Header, Order } from '../components';

import { OrderProps } from '@/types';

const Orders = ({ orders }: { orders: OrderProps[] }): JSX.Element => {
  const { data } = useSession();
  const [value, setValue] = useState('');

  const filteredOrders = orders?.filter((order) =>
    order.id.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className='bg-gray-100 h-screen'>
      <Head>
        <title>Amazon 2.0 - Orders</title>
      </Head>
      <Header setValue={setValue} placeholder='Search Orders by ORDER #' />

      <main className='max-w-screen-lg mx-auto p-10'>
        <h1 className='text-3xl border-b pb-1 border-yellow-400'>Your Orders</h1>

        {data ? <h2>{orders?.length ?? 0} Orders</h2> : <h2>Please sign in to see your orders</h2>}

        {filteredOrders?.length > 0 ? (
          <div className='mt-5 space-y-4'>
            {(value.length > 0 ? filteredOrders : orders)?.map((order) => (
              <Order order={order} key={order.id} />
            ))}
          </div>
        ) : (
          <div className='text-center text-2xl font-bold mt-8'>
            <p className='text-gray-500'>Oops!</p>
            <p className='text-gray-500'>There are no orders matching your search.</p>
          </div>
        )}
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
