import { useFreshVegetablesProductsQuery } from '@framework/product/get-all-fresh-vegetables-products';
import ProductsCarousel from '@components/product/products-carousel';
import { ROUTES } from '@utils/routes';
import { LIMITS } from '@rest/client/limits';
import { usePopularProducts } from '@rest/product';

export default function FreshVegetablesProductFeed() {
  // const { data } = useFreshVegetablesProductsQuery({
  //   limit: LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS,
  // });
  const { products, isLoading, error } = usePopularProducts({
    skip: "0",
    limit: "10",
  })

  return (
    <ProductsCarousel
      sectionHeading="text-fresh-vegetables"
      categorySlug={ROUTES.PRODUCTS}
      products={products}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.FRESH_VEGETABLES_PRODUCTS_LIMITS}
      uniqueKey="fresh-vegetable"
    />
  );
}
