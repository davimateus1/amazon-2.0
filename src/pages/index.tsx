import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

import { Header, Banner, ProductFeed } from '../components';

import { api } from './api/services';

import { ProductProps } from '@/types';

const Home = ({ products }: { products: ProductProps[] }): JSX.Element => {
  const [value, setValue] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header setValue={setValue} placeholder='Search Products By Name' />

      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
        {filteredProducts.length > 0 ? (
          <ProductFeed products={value.trim().length ? filteredProducts : products} />
        ) : (
          <div className='text-center text-2xl font-bold mt-8'>
            <p className='text-gray-500'>Oops!</p>
            <p className='text-gray-500'>There are no products matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const products = await api.get('/products').then((res) => res.data);
  const session = await getSession(context);

  return {
    props: {
      products,
      session,
    },
  };
};

export default Home;
