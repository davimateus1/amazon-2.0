import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';

import { ProductProps } from '@/types';

const MAX_RATING = 5;
const MIN_RATING = 1;

export const Product = ({ product }: { product: ProductProps }): JSX.Element => {
  const [rating, setRating] = useState(0);
  const [hasPrime, setHasPrime] = useState(false);

  useEffect(() => {
    setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);

    setHasPrime(Math.random() < 0.5);
  }, [product]);

  return (
    <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
      <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{product.category}</p>

      <Image src={product.image} height={200} width={200} objectFit='contain' alt='image' />

      <h4 className='my-3'>{product.title}</h4>

      <div className='flex'>
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <StarIcon key={i} className='h-5 text-yellow-500' />
          ))}
      </div>

      <p className='text-xs my-2 line-clamp-2'>{product.description}</p>

      <div className='mb-5 font-bold'>
        <Currency quantity={product.price} currency='USD' />
      </div>

      {hasPrime && (
        <div className='flex items-center space-x-2 -mt-5'>
          <img className='w-12' src='https://links.papareact.com/fdw' alt='prime' />
          <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
        </div>
      )}

      <button className='mt-auto button'>Add to Basket</button>
    </div>
  );
};
