import React from 'react';
import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import OrderTable from '@components/order/order-table';
import { useOrdersQuery } from '@framework/order/get-all-orders';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import { useOrders } from '@rest/order';
import { getLayout } from '@components/layout/layout-five';

// props change to orders.

export default function OrdersTablePage() {
  // const { data, isLoading } = useOrdersQuery({});
  const { orders, isLoading } = useOrders();
  return (
    <>
      <Seo
        title="Orders"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="my-account/orders"
      />
      <AccountLayout>
        {!isLoading ? <OrderTable orders={orders} /> : <div>Loading...</div>}
      </AccountLayout>
    </>
  );
}

OrdersTablePage.getLayout = getLayout;
OrdersTablePage.authenticationRequired = true;

export const getStaticProps = async ({ locale }: any) => {
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
