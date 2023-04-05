import type { GetServerSideProps } from 'next';
import Head from 'next/head';

import { api } from '@/api';
import { Header, Banner, ProductFeed } from '@/components';
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

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await api.get('/products').then((res) => res.data);

  return {
    props: {
      products,
    },
  };
};

export default Home;
