import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { InputHTMLAttributes, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectItems } from '../slices/basketSlice';

type HeaderProps = {
  setValue?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const Header = ({ setValue, ...rest }: HeaderProps): JSX.Element => {
  const { data: session } = useSession();
  const { name } = session?.user || {};
  const [searchValue, setSearchValue] = useState('');

  const router = useRouter();
  const items = useSelector(selectItems);

  const handleSearch = (): void => setValue?.(searchValue);

  return (
    <header>
      <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image
            onClick={(): Promise<boolean> => router.push('/')}
            src='https://links.papareact.com/f90'
            width={150}
            height={40}
            objectFit='contain'
            alt='amazon-logo'
            className='cursor-pointer'
          />
        </div>

        <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>
          <input
            className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4 disabled:cursor-not-allowed disabled:bg-gray-300'
            type='text'
            value={searchValue}
            onChange={(e): void => setSearchValue(e.target.value)}
            {...rest}
          />
          <SearchIcon className='h-12 p-4' onClick={handleSearch} />
        </div>

        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div onClick={(): Promise<void> => (!session ? signIn() : signOut())} className='link'>
            <p>{session ? `Hello, ${name}` : 'Sign In'}</p>
            <p className='font-extrabold md:text-sm'>Account & Lists</p>
          </div>

          <div onClick={(): Promise<boolean> => router.push('/orders')} className='link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
          </div>

          <div
            onClick={(): Promise<boolean> => router.push('/checkout')}
            className='relative link flex items-center'
          >
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
              {items.length}
            </span>
            <ShoppingCartIcon className='h-10' />
            <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
          </div>
        </div>
      </div>

      <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
        <p className='link flex items-center'>
          <MenuIcon className='h-6 mr-1' />
          All
        </p>
        <p className='link'>Prime Video</p>
        <p className='link'>Amazon Business</p>
        <p className='link'>Today`s Deals</p>
        <p className='hidden lg:inline-flex link'>Electronics</p>
        <p className='hidden lg:inline-flex link'>Food & Grocery</p>
        <p className='hidden lg:inline-flex link'>Prime</p>
        <p className='hidden lg:inline-flex link'>Buy Again</p>
        <p className='hidden lg:inline-flex link'>Shopper Toolkit</p>
        <p className='hidden lg:inline-flex link'>Health & Personal Care</p>
      </div>
    </header>
  );
};
