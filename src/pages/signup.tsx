import SignupForm from '@components/auth/sign-up-form';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Seo from '@components/seo/seo';
import Divider from '@components/ui/divider';
import { getLayout } from '@components/layout/layout-five';

export default function SignInPage() {
  return (
    <>
      <Seo
        title="Sign Up"
        description="Organic, natural, Products in Dhaka Bangladesh | Organic Online Sale store in Bangladesh."
        path="signup"
      />
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <SignupForm
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
  if (req.cookies.auth_token != undefined) {
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
