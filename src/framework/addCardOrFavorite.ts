import { useModalAction } from '@components/common/modal/modal.context';
import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import { HttpClient } from '@rest/client/http';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

export const postFunction = (input: any) =>
  HttpClient.post<any>(API_ENDPOINTS.CARTORFAVORITE, input);

export function useAddCardOrFavorite() {
  const queryClient = useQueryClient();
  // const { closeModal } = useModalAction();
  // const [formError, setFormError] = useState('');

  const { mutate, isLoading } = useMutation(postFunction, {
    onSuccess: (data) => {
      if (data?.success) {
        // closeModal();
      } else {
        // Handle the scenario where `data.success` is false
        console.log('Action was not successful.');
      }
    },
    // onError: (error: any) => {
    //   if (error?.response?.data?.message) {
    //     console.log(error.response.data.message);
    //   } else {
    //     console.log('An unexpected error occurred.');
    //   }
    // },
    onSettled: () => {
      queryClient.invalidateQueries([API_ENDPOINTS.CARTORFAVORITE]);
    },
  });

  return { mutate, isLoading };
}
