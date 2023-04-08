import { StarIcon } from '@heroicons/react/solid';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header, Product, customToast } from '../../components';
import { addToBasket } from '../../slices/basketSlice';
import { api } from '../api/services';

import { ProductProps } from '@/types';

type ProductDetailProps = {
  product: ProductProps;
  relatedProducts: ProductProps[];
};

const ProductDetail = ({ product, relatedProducts }: ProductDetailProps): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigateToProductDetail = (id: number): void => {
    router.push(`/product-detail/${id}`);
  };

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
    customToast('success');
  };

  return (
    <div className='bg-gray-100'>
      <Head>
        <title>Amazon 2.0 - {product.title}</title>
      </Head>
      <Header disabled={true} />
      <main className='lg:flex max-w-screen-2xl mx-auto'>
        <div className='lg:flex flex-grow m-5 shadow-sm items-center'>
          <div className='flex flex-col p-5 space-y-10 bg-white'>
            <Image
              src={product.image}
              alt={product.title}
              width={800}
              height={800}
              objectFit='contain'
            />
          </div>
          <div className='flex flex-col p-5 space-y-5 bg-white'>
            <h1 className='text-3xl pb-1'>{product.title}</h1>
            <div className='flex border-b pb-3'>
              {Array(product.rating)
                .fill(product.rating)
                .map((_, i) => (
                  <StarIcon key={i} className='h-7 text-yellow-500' />
                ))}
            </div>
            <div className='mb-5 font-bold text-2xl'>
              <Currency quantity={product.price} currency='USD' />
            </div>
            {product.hasPrime && (
              <div className='flex items-center space-x-2 -mt-5'>
                <img className='w-12' src='https://links.papareact.com/fdw' alt='prime' />
                <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
              </div>
            )}
            <p className='text-md my-2 line-clamp-3'>{product.description}</p>
          </div>
        </div>
        <div className='flex flex-col bg-white p-10 shadow-md justify-center lg:w-max'>
          <h2 className='text-xl mb-2 border-b pb-2'>
            You like this product? Add it to your basket!
          </h2>

          <button role='link' className='button mt-2' onClick={addItemToBasket}>
            Add to Basket
          </button>
          <ToastContainer />
        </div>
      </main>
      <main className='lg:flex max-w-screen-2xl mx-auto'>
        <div className='flex flex-col p-5 space-y-10 bg-white mt-5'>
          <h1 className='text-3xl border-b pb-4'>Related Products</h1>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {relatedProducts.map((p) => (
              <Product
                key={p.id}
                product={p}
                onClick={(): void => handleNavigateToProductDetail(p.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query;
  const hasPrime = Math.random() < 0.5;

  const product: ProductProps = await api.get(`/products/${id}`).then((res) => res.data);
  const products: ProductProps[] = await api.get('/products').then((res) => res.data);

  const relatedProducts = products.filter((p) => p.category === product.category);

  return {
    props: {
      product: {
        ...product,
        hasPrime,
      },
      relatedProducts,
    },
  };
};

export default ProductDetail;
