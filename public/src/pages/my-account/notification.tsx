import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Notifications from '@components/my-account/notification';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { getLayout } from '@components/layout/layout-five';

export default function Notification() {
  return (
    <>
      <Seo
        title="Notification"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="my-account/notification"
      />
      <AccountLayout>
        <Notifications />
      </AccountLayout>
    </>
  );
}

Notification.getLayout = getLayout;
Notification.authenticationRequired = true;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
