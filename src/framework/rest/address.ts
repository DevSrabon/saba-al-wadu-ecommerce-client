import { useMutation, useQuery, useQueryClient } from 'react-query';
import { API_ENDPOINTS } from './client/api-endpoints';
import {
  IAddAddress,
  IAreaResponse,
  ICitiesResponse,
  IGetAllArea,
  IGetAllCities,
  IGetAllProvince,
  IGetAllSubCities,
  IProvinceResponse,
  ISubCitiesResponse,
} from 'src/types';
import client from './client';
import { useModalAction } from '@components/common/modal/modal.context';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

export function useProvince() {
  const { data, isLoading, error } = useQuery<IProvinceResponse, Error>(
    [API_ENDPOINTS.GET_ALL_PROVINCE],
    () => client.address.getAllProvince(),
    { keepPreviousData: true }
  );
  return {
    province: data?.data || ([] as IGetAllProvince[]),
    isLoading,
    error,
  };
}
export function useCities(id: string) {
  const { data, isLoading, error } = useQuery<ICitiesResponse, Error>(
    [API_ENDPOINTS.GET_ALL_CITIES, id],
    () => client.address.getAllCities(id),
    { enabled: !!id }
  );
  return {
    cities: data?.data || ([] as IGetAllCities[]),
    isLoading,
    error,
  };
}
export function useSubCities(id: string) {
  const { data, isLoading, error } = useQuery<ISubCitiesResponse, Error>(
    [API_ENDPOINTS.GET_ALL_SUB_CITIES, id],
    () => client.address.getAllSubCities(id),
    { enabled: !!id }
  );
  return {
    subCities: data?.data || ([] as IGetAllSubCities[]),
    isLoading,
    error,
  };
}
export function useArea(id: string) {
  const { data, isLoading, error } = useQuery<IAreaResponse, Error>(
    [API_ENDPOINTS.GET_ALL_AREA, id],
    () => client.address.getAllArea(id),
    { enabled: !!id }
  );
  return {
    area: data?.data || ([] as IGetAllArea[]),
    isLoading,
    error,
  };
}
export function useAddAddress() {
  // const { t } = useTranslation('common');
  // const { setToken } = useToken();
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  let [formError, setFormError] = useState<Partial<IAddAddress> | null>(null);

  const { mutate, isLoading } = useMutation(client.address.addAddress, {
    onSuccess: (data) => {
      if (data?.success) {
        closeModal();
      }
      // if (!data.token) {
      //   console.log("Error: Invalid token")
      //   toast.error(t('error-credential-wrong'));
      // }
    },

    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setFormError(data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [API_ENDPOINTS.USERS_ME] });
    },
  });

  return { mutate, isLoading, formError, setFormError };
}

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  const { width } = useWindowSize();
  return useMutation(client.address.update, {
    onSuccess: (data) => {
      if (data?.success) {
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
      }
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
