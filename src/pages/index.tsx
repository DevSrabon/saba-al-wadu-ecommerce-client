import { getLayout } from '@components/layout/layout-five';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DownloadApps from '@components/common/download-apps';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import { LIMITS } from '@rest/client/limits';
import CategoryGridListBlock from '@components/common/category-grid-list-block';
import HeroCarouselBlock from '@components/hero/hero-carousel-block';
import { refinedSixHeroBanner as heroBanner } from '@framework/static/banner';
import FreshVegetablesProductFeed from '@components/product/feeds/fresh-vegetables-product-feed';
import client from '@rest/client';
import { IProductsQueryKeys } from 'src/types';
import { fetchCategories } from '@rest/categories';

export default function Home() {
  return (
    <>
      <Seo title="Home" description="" path="/" />
      {/* <HeroBannerCard
        banner={heroBanner}
        className="hero-banner-six min-h-[400px] md:min-h-[460px] lg:min-h-[500px] xl:min-h-[650px] py-20 py:pt-24 mb-5 2xl:bg-center"
      /> */}
      {/* <Container className="-mt-[60px] relative z-10">
      </Container> */}
      {/* <BestSellerGroceryProductFeed variant="oak" /> */}

      <Container>
        <HeroCarouselBlock heroBanner={heroBanner} />
        <CategoryGridListBlock />
        {/* <BundleGrid
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          data={bundle}
        /> */}
        {/* <BundleGrid
          data={bundle}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
        /> */}
        {/* <CategoryGridBlock /> */}

        <BestSellerGroceryProductFeed variant="alpine" />
        {/* <BannerGrid
          data={banners}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
        /> */}
        {/* <PopularProductFeed variant="alpine" /> final */}
        {/* <BestSellerProductFeed /> */}
        <FreshVegetablesProductFeed />
        {/* <ChipsProductFeed /> */}
      </Container>
      {/* <CollectionGrid
        headingPosition="center"
        className="pb-1 mb-12 xl:pt-2 2xl:pt-4 3xl:pt-6 lg:pb-0 lg:mb-14 xl:mb-16 2xl:mb-20"
      /> */}
      <DownloadApps />
    </>
  );
}

Home.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.PRODUCT_CATEGORIES],
    fetchCategories
  );
  const formattedOptions: Partial<IProductsQueryKeys> = {
    skip: LIMITS.PRODUCTS_SKIP,
    limit: LIMITS.POPULAR_PRODUCTS_LIMITS,
  };
  await queryClient.prefetchQuery(
    [API_ENDPOINTS.QUERY_PRODUCTS, formattedOptions],
    ({ queryKey }) => client.products.popular(queryKey[1] as IProductsQueryKeys)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: LIMITS.REVALIDATE_LIMITS,
  };
};
