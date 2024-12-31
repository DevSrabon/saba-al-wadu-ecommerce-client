import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import { HttpClient } from '@rest/client/http';
import { useQuery } from 'react-query';
import { ICartProduct, ICartResponse } from '../types/cartTypes';

const getCartData = (type: string) => () =>
  HttpClient.get<ICartResponse>(`${API_ENDPOINTS.CARTORFAVORITE}?type=${type}`);

export function useCartProducts(type: string) {
  const { data, isLoading, error } = useQuery<ICartResponse, Error>(
    [API_ENDPOINTS.CARTORFAVORITE, type,'cart'],
    getCartData(type),
    { refetchOnWindowFocus: false }
  );

  return {
    cartData: data?.data || ([] as ICartProduct[]),
    isLoading,
    error,
  };
}
