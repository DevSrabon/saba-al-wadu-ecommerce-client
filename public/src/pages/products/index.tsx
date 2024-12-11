import Layout from '@components/layout/layout';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ShopsPageContent from '@components/shops/shops-page-content';
import DownloadApps from '@components/common/download-apps';
import PageHeroSection from '@components/ui/page-hero-section';
import Seo from '@components/seo/seo';
// import { fetchShops } from '@framework/shop/get-shops';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import { getLayout } from '@components/layout/layout-five';
import { LIMITS } from '@rest/client/limits';

export default function ShopsPage() {
  return (
    <>
      <Seo
        title="Shops"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="shops"
      />
      <PageHeroSection
        heroTitle="text-shop-page"
        backgroundThumbnail="/assets/images/shop-page-hero-bg.jpg"
        mobileBackgroundThumbnail="/assets/images/shop-page-hero-mobile-bg.png"
        variant="white"
      />
      <ShopsPageContent />
      <DownloadApps />
    </>
  );
}

ShopsPage.getLayout = getLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();
  // await queryClient.prefetchQuery(
  //   [API_ENDPOINTS.SHOPS, { limit: 6 }],
  //   fetchShops
  // );

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
