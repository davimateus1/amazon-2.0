import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';

import { addToBasket, removeFromBasket } from '../slices/basketSlice';

import { ProductProps } from '@/types';

export const CheckoutProduct = ({ product }: { product: ProductProps }): JSX.Element => {
  const dispatch = useDispatch();

  const addItemToBasket = (): void => {
    const productToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
      hasPrime: product.hasPrime,
    };

    dispatch(addToBasket(productToAdd));
  };

  const removeItemFromBasket = (): void => {
    dispatch(removeFromBasket({ id: product.id }));
  };

  return (
    <div className='grid grid-cols-5'>
      <Image src={product.image} height={200} width={200} objectFit='contain' alt='image' />
      <div className='col-span-3 mx-5'>
        <p>{product.title}</p>
        <div className='flex'>
          {Array(product.rating)
            .fill(product.rating)
            .map((_, i) => (
              <StarIcon key={i} className='h-5 text-yellow-500' />
            ))}
        </div>

        <p className='text-xs my-2 line-clamp-3'>{product.description}</p>
        <div className='mb-5 font-bold'>
          <Currency quantity={product.price} currency='USD' />
        </div>

        {product?.hasPrime && (
          <div className='flex items-center space-x-2 -mt-5'>
            <img
              loading='lazy'
              className='w-12'
              src='https://links.papareact.com/fdw'
              alt='prime'
            />
            <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-2 my-auto justify-self-end'>
        <button className='button' onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className='button' onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};
