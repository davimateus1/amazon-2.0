import moment from 'moment';
import Currency from 'react-currency-formatter';

import { OrderProps } from '@/types';

export const Order = ({ order }: { order: OrderProps }): JSX.Element => {
  const centsToDollars = (cents: number): number => cents / 100;

  return (
    <div className='relative border rounded-md'>
      <div className='flex items-center space-x-10 p-5 bg-gray-200 text-sm text-gray-600'>
        <div>
          <p className='font-bold text-xs'>ORDER PLACED</p>
          <p>{moment.unix(order.timestamp).format('DD MMM YYYY')}</p>
        </div>

        <div>
          <p className='text-xs font-bold'>TOTAL</p>
          <div className='flex'>
            <p className='mr-0.5'>
              <Currency quantity={centsToDollars(order.amount)} currency='USD' /> - Next Day
              Delivery
            </p>
            <p>
              <Currency quantity={centsToDollars(order.amount_shipping)} currency='USD' />
            </p>
          </div>
        </div>

        <p className='text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500'>
          {order.items.length} items
        </p>
        <p className='absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap'>
          ORDER # {order.id}
        </p>
      </div>

      <div className='p-5 sm:p-10'>
        <div className='flex space-x-6 overflow-x-auto'>
          {order.images.map((image) => (
            <img src={image} alt='' className='h-20 object-contain sm:h-32' key={image} />
          ))}
        </div>
      </div>
    </div>
  );
};
