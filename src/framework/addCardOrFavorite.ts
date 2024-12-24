import { useModalAction } from '@components/common/modal/modal.context';
import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import { HttpClient } from '@rest/client/http';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { IAddAddress } from 'src/types';

const postFunction = (input: any) =>
  HttpClient.post<any>(API_ENDPOINTS.CARTORFAVORITE, input);

export function useAddCardOrFavorite() {
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  const [formError, setFormError] = useState<Partial<any> | null>(null);

  const { mutate, isLoading } = useMutation(postFunction, {
    onSuccess: (data) => {
      if (data?.success) {
        closeModal();
      } else {
        // Handle the scenario where `data.success` is false
        setFormError({ general: 'Action was not successful.' });
      }
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        setFormError({ message: error.response.data.message });
      } else {
        setFormError({ general: 'An unexpected error occurred.' });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([API_ENDPOINTS.CARTORFAVORITE]);
    },
  });

  return { mutate, isLoading, formError, setFormError };
}
