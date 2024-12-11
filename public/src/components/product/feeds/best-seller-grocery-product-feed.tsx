import type { FC } from 'react';
import { useBestSellerGroceryProductsQuery } from '@framework/product/get-all-best-seller-grocery-products';
import ProductsGridBlock from '../products-grid-block';
import { LIMITS } from '@rest/client/limits';
import { usePopularProducts } from '@rest/product';

interface ProductFeedProps {
  className?: string;
  variant?: string;
}

const BestSellerGroceryProductFeed: FC<ProductFeedProps> = ({
  className,
  variant,
}) => {
  // const { data, isLoading, error } = useBestSellerGroceryProductsQuery({
  //   limit: LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS,
  // });
  const { products, isLoading, error } = usePopularProducts({
    limit: LIMITS.POPULAR_PRODUCTS_LIMITS,
    skip: LIMITS.PRODUCTS_SKIP,
  });
  return (
    <ProductsGridBlock
      sectionHeading="text-best-grocery-near-you"
      sectionSubHeading="text-fresh-grocery-items"
      className={className}
      products={products}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.BEST_SELLER_GROCERY_PRODUCTS_LIMITS}
      uniqueKey="best-sellers"
      variant={variant}
    />
  );
};
export default BestSellerGroceryProductFeed;
