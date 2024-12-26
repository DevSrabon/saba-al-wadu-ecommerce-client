import { useModalAction } from '@components/common/modal/modal.context';
import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import { HttpClient } from '@rest/client/http';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

export const postFunction = (input: any) =>
  HttpClient.post<any>(API_ENDPOINTS.CARTORFAVORITE, input);

export function useAddCardOrFavorite() {
  const queryClient = useQueryClient();
  // const { closeModal } = useModalAction();
  // const [formError, setFormError] = useState('');

  const { mutate, isLoading } = useMutation(postFunction, {
    onSuccess: (data) => {
      if (data?.success) {
        toast('Successfully add to cart', {
          progressClassName: 'fancy-progress-bar',
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // closeModal();
      } else {
        // Handle the scenario where `data.success` is false
        console.log('Action was not successful.');
      }
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message, {
          // progressClassName: 'fancy-progress-bar',
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([API_ENDPOINTS.CARTORFAVORITE]);
    },
  });

  return { mutate, isLoading };
}
