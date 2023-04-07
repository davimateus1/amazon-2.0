import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { getSession } from 'next-auth/react';

import { Header, Banner, ProductFeed } from '../components';

import { api } from './api/services';

import { ProductProps } from '@/types';

const Home = ({ products }: { products: ProductProps[] }): JSX.Element => {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
        <ProductFeed products={products} />
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
