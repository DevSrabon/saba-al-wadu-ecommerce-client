import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import { HttpClient } from '@rest/client/http';
import { useQuery } from 'react-query';
import { ICartProduct, ICartResponse } from '../types/cartTypes';

const getCartData = (type: string) => () =>
  HttpClient.get<ICartResponse>(`${API_ENDPOINTS.CARTORFAVORITE}?type=${type}`);

export function useCartProducts(type: string) {
  const { data, isLoading, error } = useQuery<ICartResponse, Error>(
    [type],
    getCartData(type)
  );

  return {
    cartData: data?.data || ([] as ICartProduct[]),
    isLoading,
    error,
  };
}
