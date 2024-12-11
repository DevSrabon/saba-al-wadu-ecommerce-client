import Layout from '@components/layout/layout';
import AccountLayout from '@components/my-account/account-layout';
import Legal from '@components/my-account/notice';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { getLayout } from '@components/layout/layout-five';

export default function LegalNotice() {
  return (
    <>
      <Seo
        title="Legal Notice"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="legal-notice"
      />
      <AccountLayout>
        <Legal />
      </AccountLayout>
    </>
  );
}

LegalNotice.getLayout = getLayout;
LegalNotice.authenticationRequired = true;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'legal',
        'footer',
      ])),
    },
  };
};
