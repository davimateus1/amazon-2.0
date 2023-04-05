import Image from 'next/image';
import { useSelector } from 'react-redux';

import { CheckoutProduct, Header } from '../components';
import { selectItems } from '../slices/basketSlice';

import { ProductProps } from '@/types';

const Checkout = (): JSX.Element => {
  const items = useSelector(selectItems) as ProductProps[];

  return (
    <div className='bg-gray-100'>
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
      </main>
    </div>
  );
};

export default Checkout;
