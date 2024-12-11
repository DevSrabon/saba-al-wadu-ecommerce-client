import { useModalAction } from '@components/common/modal/modal.context';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import client from './client';
import { useToken } from 'src/lib/hooks/use-token';
import { useTranslation } from 'react-i18next';
import { useUI } from '@contexts/ui.context';
import { useRouter } from 'next/router';
import { API_ENDPOINTS } from './client/api-endpoints';
import { IUsers } from 'src/types';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

export function useUser() {
  const { isAuthorized } = useUI();
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.USERS_ME],
    client.users.me,
    {
      enabled: isAuthorized,
      onError: (err) => {
        console.log(err);
      },
    }
  );
  //TODO: do some improvement here
  return { me: data?.data || ({} as IUsers), isLoading, error, isAuthorized };
}

export function useRegister() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { setToken } = useToken();
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  let [serverError, setServerError] = useState<string | null>(null);
  const { width } = useWindowSize();

  const { mutate, isLoading } = useMutation(client.users.register, {
    onSuccess: (data) => {
      if (data.token && data.success) {
        setToken(data.token);
        closeModal();
        authorize();
        router.reload();
        toast(data.message, {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
      if (!data.token) {
        console.log('Error: Invalid token');
        setServerError(data.message!);
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setServerError(data.message);
    },
  });
  return { mutate, isLoading, serverError, setServerError };
}

export function useSendOTP() {
  const { openModal } = useModalAction();
  let [serverError, setServerError] = useState<string | null>(null);
  const { width } = useWindowSize();

  const { mutate, isLoading } = useMutation(client.users.sendOTP, {
    onSuccess: (data) => {
      if (data.success) {
        openModal('MATCH_OTP', data.data?.email);
        toast(data.message, {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setServerError(data.message);
    },
  });
  return { mutate, isLoading, serverError, setServerError };
}

export function useMatchOTP() {
  const { openModal } = useModalAction();
  let [serverError, setServerError] = useState<string | null>(null);
  const { width } = useWindowSize();

  const { mutate, isLoading } = useMutation(client.users.matchOTP, {
    onSuccess: (data) => {
      if (data.success) {
        openModal('NEW_PASSWORD', data.token);
        toast(data.message, {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setServerError(data.message);
    },
  });
  return { mutate, isLoading, serverError, setServerError };
}

export function useNewPassword() {
  const { closeModal } = useModalAction();
  let [serverError, setServerError] = useState<string | null>(null);
  const { width } = useWindowSize();
  const { mutate, isLoading } = useMutation(client.users.newPassword, {
    onSuccess: (data) => {
      if (data.success) {
        closeModal();
        toast(data.message, {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setServerError(data.message);
    },
  });
  return { mutate, isLoading, serverError, setServerError };
}

export function useLogin() {
  const { t } = useTranslation('common');
  const { authorize } = useUI();
  const { closeModal } = useModalAction();
  const { width } = useWindowSize();
  const { setToken } = useToken();
  const router = useRouter();
  let [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isLoading } = useMutation(client.users.login, {
    onSuccess: (data) => {
      console.log(data);
      if (data.success) {
        setToken(data.token!);
        authorize();
        closeModal();
        router.reload();
        toast(data.message, {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        setServerError('error-credential-wrong');
      }
    },
    onError: (error: Error) => {
      console.log(error.message);
      setServerError('error-credential-wrong');
    },
  });

  return { mutate, isLoading, serverError, setServerError };
}

async function logout() {
  return {
    success: true,
    message: 'Logout Successful!',
  };
}
export const useLogout = () => {
  const router = useRouter();
  const { removeToken } = useToken();
  const { unauthorize } = useUI();
  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      router.push('/');
      removeToken();
      unauthorize();
    },
    onError: (data) => {
      console.log(data, 'logout error response');
    },
  });
};
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { width } = useWindowSize();
  return useMutation(client.users.update, {
    onSuccess: (data) => {
      toast(data.message, {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      console.log(data?.message);
      // toast.error(t('error-something-wrong'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.USERS_ME] });
    },
  });
};
export const useChangePassword = () => {
  const queryClient = useQueryClient();
  const { width } = useWindowSize();
  const [serverError, setServerError] = useState<string | null>('');
  const router = useRouter();

  const { isLoading, data, mutate, isSuccess } = useMutation(
    client.users.changePassword,
    {
      onSuccess: (data) => {
        toast(data.message, {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        if (data.success) {
          router.push('/my-account');
        }
      },
      onError: (error) => {
        const {
          response: { data },
        }: any = error ?? {};
        setServerError(data?.message);
        // toast.error(t('error-something-wrong'));
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.USERS_ME] });
      },
    }
  );
  return { isLoading, data, mutate, serverError, setServerError };
};
