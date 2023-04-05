import type { NextPage } from 'next';
import Head from 'next/head';

import { Header, Banner } from '@/components';

const Home: NextPage = () => {
  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Header />

      <main className='max-w-screen-2xl mx-auto'>
        <Banner />
      </main>
    </div>
  );
};

export default Home;
