import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import AddressGrid from '@components/address/address-grid';
import { useAddressQuery } from '@framework/address/address';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { useUser } from '@rest/user';
import { getLayout } from '@components/layout/layout-five';

export default function AccountDetailsPage() {
  const { me } = useUser();
  if (!me) return null;
  return (
    <>
      <Seo
        title="Address"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="my-account/address"
      />
      <AccountLayout>
        <AddressGrid address={me?.address} />
      </AccountLayout>
    </>
  );
}

AccountDetailsPage.getLayout = getLayout;
AccountDetailsPage.authenticationRequired = true;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'terms',
        'faq',
        'footer',
      ])),
    },
  };
};
