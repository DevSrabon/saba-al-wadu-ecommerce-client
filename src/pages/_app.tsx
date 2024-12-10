import type { AppProps } from 'next/app';
import { ManagedUIContext } from '@contexts/ui.context';
import ManagedModal from '@components/common/modal/managed-modal';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import React, { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import { ToastContainer } from 'react-toastify';
// import { ReactQueryDevtools } from 'react-query/devtools';
import NProgress from 'nprogress';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from '@components/seo/default-seo';
// external
import 'react-toastify/dist/ReactToastify.css';
import 'nprogress/nprogress.css';

// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import '@assets/css/globals.css';
import '@assets/css/rc-drawer.css';
import PrivateRoute from 'src/lib/private-route';
import { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
  authenticationRequired?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const CustomApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const queryClientRef = useRef<any>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  React.useEffect(() => {
    NProgress.configure({ showSpinner: false });
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);
  const getLayout = Component.getLayout ?? ((page) => page);
  const authenticationRequired =
    (Component as any).authenticationRequired ?? false;
  return (
    <QueryClientProvider client={queryClientRef.current}>
      {/* @ts-ignore */}
      <Hydrate state={pageProps.dehydratedState}>
        <ManagedUIContext>
          <>
            <DefaultSeo />
            {getLayout(<Component {...pageProps} key={router.route} />)}
            {/* {Boolean(authenticationRequired) ? (
              <PrivateRoute>
                {getLayout(<Component {...pageProps} />)}
              </PrivateRoute>
            ) : (
              getLayout(<Component {...pageProps} key={router.route} />)
            )} */}
            <ToastContainer />
            <ManagedModal />
            <ManagedDrawer />
          </>
        </ManagedUIContext>
      </Hydrate>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
