import { useQuery } from 'react-query';
import {
  IProductResponse,
  IProducts,
  IProductsQueryKeys,
  ISingleProductResponseType,
} from 'src/types';
import client from './client';
import { API_ENDPOINTS } from './client/api-endpoints';

export const fetchPopularProducts = ({
  queryKey,
}: {
  queryKey: readonly unknown[] | [string];
}) => {
  return client.products.popular(queryKey[1] as IProductsQueryKeys);
};

export const usePopularProducts = (options?: Partial<IProductsQueryKeys>) => {
  const { data, isLoading, error } = useQuery<IProductResponse, Error>(
    [API_ENDPOINTS.QUERY_PRODUCTS, options],
    fetchPopularProducts
  );

  return {
    products: data?.data as IProducts[],
    isLoading,
    error,
  };
};
export const useSearchProducts = (searchParam: { name: string }) => {
  const { data, isLoading, error } = useQuery<IProductResponse, Error>(
    [API_ENDPOINTS.QUERY_PRODUCTS, searchParam],
    fetchPopularProducts,
    {
      enabled: !!searchParam.name,
    }
  );

  return {
    products: data?.data as IProducts[],
    isLoading,
    error,
  };
};

export function useProduct({ slug }: { slug: string }) {
  const { data, isLoading, error } = useQuery<
    ISingleProductResponseType,
    Error
  >([API_ENDPOINTS.QUERY_PRODUCTS, { slug }], () =>
    client.products.get({ slug })
  );
  return {
    product: data?.data ?? ({} as IProducts),
    isLoading,
    error,
  };
}
