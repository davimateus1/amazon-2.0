import Head from 'next/head';
import { useRouter } from 'next/router';

import { Header } from '../components';

const ErrorPage = (): JSX.Element => {
  const router = useRouter();

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <Head>
        <title>Amazon 2.0 - Error</title>
      </Head>
      <Header />
      <main className='flex-1 flex flex-col items-center justify-center'>
        <div className='animate-bounce'>
          <h1 className='text-9xl font-bold text-yellow-400'>
            <span className='mr-2'>4</span>
            <span className='mr-2'>0</span>
            <span className='mr-2'>4</span>
          </h1>
        </div>
        <h2 className='text-3xl font-bold mb-4'>Page Not Found</h2>
        <p className='text-gray-600 text-center'>
          The page you are looking for could not be found.
        </p>
        <button
          onClick={(): Promise<boolean> => router.push('/')}
          className='mt-6 px-4 py-2 button'
        >
          Go back to Home
        </button>
      </main>
    </div>
  );
};

export default ErrorPage;
