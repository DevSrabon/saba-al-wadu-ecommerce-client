import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import OrderDetails from '@components/order/order-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { getLayout } from '@components/layout/layout-five';

export default function OrderPage() {
  return (
    <AccountLayout>
      <OrderDetails className="p-0" />
    </AccountLayout>
  );
}

OrderPage.getLayout = getLayout;
OrderPage.authenticationRequired = true;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
