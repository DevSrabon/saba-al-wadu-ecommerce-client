import ProductsCarousel from '@components/product/products-carousel';
import { useRelatedProductsQuery } from '@framework/product/get-related-product';
import { LIMITS } from '@rest/client/limits';
import { usePopularProducts } from '@rest/product';

interface RelatedProductsProps {
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
}) => {
  // const { data, isLoading, error } = useRelatedProductsQuery({
  //   limit: LIMITS.RELATED_PRODUCTS_LIMITS,
  // });
  const { products, isLoading, error } = usePopularProducts({
    limit: LIMITS.POPULAR_PRODUCTS_LIMITS,
    skip: LIMITS.PRODUCTS_SKIP,
  });

  return (
    <ProductsCarousel
      sectionHeading="Related Products"
      categorySlug="/search"
      className={className}
      products={products}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.POPULAR_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
    />
  );
};

export default RelatedProductFeed;
