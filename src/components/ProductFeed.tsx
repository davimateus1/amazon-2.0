import { useRouter } from 'next/router';

import { Product } from './Product';

import { ProductProps } from '@/types';

export const ProductFeed = ({ products }: { products: ProductProps[] }): JSX.Element => {
  const router = useRouter();

  const handleNavigateToProductDetail = (id: number): void => {
    router.push(`/product-detail/${id}`);
  };

  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
      {products.slice(0, 4).map((product) => (
        <Product
          product={product}
          key={product.id}
          onClick={(): void => handleNavigateToProductDetail(product.id)}
        />
      ))}

      <img className='md:col-span-full' src='https://links.papareact.com/dyz' alt='ad' />

      <div className='md:col-span-2'>
        {products.slice(4, 5).map((product) => (
          <Product
            product={product}
            key={product.id}
            onClick={(): void => handleNavigateToProductDetail(product.id)}
          />
        ))}
      </div>

      {products.slice(5, products.length).map((product) => (
        <Product
          product={product}
          key={product.id}
          onClick={(): void => handleNavigateToProductDetail(product.id)}
        />
      ))}
    </div>
  );
};
