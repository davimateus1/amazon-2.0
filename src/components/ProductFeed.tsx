import { Product } from './Product';

import { ProductProps } from '@/types';

export const ProductFeed = ({ products }: { products: ProductProps[] }): JSX.Element => {
  return (
    <div>
      <h1>Product Feed...</h1>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};
