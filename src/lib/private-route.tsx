import { useRouter } from 'next/router';
import Spinner from '@components/ui/loaders/spinner/spinner';
import { useUser } from '@rest/user';
import { BackArrowRound } from '@components/icons/back-arrow-round';
import LoginForm from '@components/auth/login-form';
import { useEffect, useState } from 'react';


type IProps = {
  children: React.ReactNode;
  // children: (page: React.ReactElement) => React.ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isAuthorized, me } = useUser();
  const isUser = !!me.ec_id;
  useEffect(() => {
    // Fetch user data here and set it using setUser
    // For example:
    // setUser(fetchUserData());
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <Spinner showText={loading} />;
  }

  if (typeof window !== "undefined" && !isUser && !isAuthorized) {
    return (
      <div className="flex w-full justify-center py-5 md:py-8 relative">
        <button
          className="w-8 md:w-16 h-8 md:h-16 flex items-center justify-center absolute top-5 md:top-1/2 start-5 md:start-10 md:-mt-8 text-gray-200 md:text-gray-300 hover:text-gray-400 transition-colors"
          onClick={router.back}
        >
          <BackArrowRound />
        </button>
        <div className="flex items-center justify-center">
          <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
            <LoginForm
              isPopup={false}
              className="border rounded-lg border-border-base"
            />
          </div>
        </div>
      </div>
    );
  }
  if (typeof window !== "undefined" && isUser && isAuthorized) {
    return <>{children}</>;
  }


  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Spinner showText={loading} />;
};

export default PrivateRoute;

