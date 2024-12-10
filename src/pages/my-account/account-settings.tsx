import AccountLayout from '@components/my-account/account-layout';
import AccountDetails from '@components/my-account/account-details';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { getLayout } from '@components/layout/layout-five';

export default function AccountDetailsPage() {
  return (
    <>
      <Seo
        title="Account Settings"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="my-account/account-settings"
      />
      <AccountLayout>
        <AccountDetails />
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.getLayout = getLayout;
// AccountDetailsPage.authenticationRequired = true;

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
