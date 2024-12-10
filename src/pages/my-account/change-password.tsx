import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import ChangePassword from '@components/my-account/change-password';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { getLayout } from '@components/layout/layout-five';

export default function ChangePasswordPage() {
  return (
    <>
      <Seo
        title="Change Password"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="my-account/change-password"
      />
      <AccountLayout>
        <ChangePassword />
      </AccountLayout>
    </>
  );
}

ChangePasswordPage.getLayout = getLayout;
ChangePasswordPage.authenticationRequired = true;

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
