import LoginForm from '@components/auth/login-form';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Divider from '@components/ui/divider';
import Seo from '@components/seo/seo';
import { getLayout } from '@components/layout/layout-five';

export default function SignInPage() {
  return (
    <>
      <Seo
        title="Sign In"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="signin"
      />
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <LoginForm
            isPopup={false}
            className="border rounded-lg border-border-base"
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

SignInPage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
}) => {
  if (req.cookies.auth_token !== undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
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
