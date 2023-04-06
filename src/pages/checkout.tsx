import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux';

import { CheckoutProduct, Header } from '../components';
import { selectItems, selectTotal } from '../slices/basketSlice';

const Checkout = (): JSX.Element => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } = useSession();

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0 - Checkout</title>
      </Head>
      <Header />

      <main className='lg:flex max-w-screen-2xl mx-auto'>
        <div className='flex-grow m-5 shadow-sm'>
          <Image
            src='https://links.papareact.com/ikj'
            alt='banner'
            width={1020}
            height={250}
            objectFit='contain'
          />

          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <h1 className='text-3xl border-b pb-4'>
              {items.length === 0 ? 'Your Amazon Basket is empty.' : 'Shopping Basket'}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct key={i} product={item} />
            ))}
          </div>
        </div>

        {items.length > 0 && (
          <div className='flex flex-col bg-white p-10 shadow-md'>
            <>
              <h2 className='whitespace-nowrap'>
                Subtotal ({items.length} items):
                <span className='font-bold ml-1'>
                  <Currency quantity={total} currency='USD' />
                </span>
              </h2>

              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'
                }`}
              >
                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
              </button>
            </>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
