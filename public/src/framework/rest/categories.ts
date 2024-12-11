import { useQuery } from 'react-query';
import {
  ICategories,
  ICategoriesQueryKeys,
  ICategoriesResponse,
} from 'src/types';
import { API_ENDPOINTS } from './client/api-endpoints';
import client from './client';

export const fetchCategories = ({
  queryKey,
}: {
  queryKey: readonly unknown[] | [string];
}) => {
  return client.categories.get(queryKey[1] as ICategoriesQueryKeys);
};

export const useCategories = (options?: Partial<ICategoriesQueryKeys>) => {
  const { data, isLoading, error } = useQuery<ICategoriesResponse, Error>(
    [API_ENDPOINTS.PRODUCT_CATEGORIES, options],
    fetchCategories
  );

  return {
    categories: data?.data as ICategories[],
    isLoading,
    error,
  };
};
