import { Product } from '@/types';

export const ProductFeed = ({ products }: { products: Product[] }): JSX.Element => {
  return (
    <div>
      <h1>Product Feed...</h1>
      {products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};
