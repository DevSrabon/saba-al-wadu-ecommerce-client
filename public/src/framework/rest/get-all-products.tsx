import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from 'react-query';
import { IProductResponse, IProducts, IProductsQueryKeys } from 'src/types';
import client from './client';
import { LIMITS } from './client/limits';
type PaginatedProduct = {
  data: IProducts[];
  paginatorInfo: any;
};
const fetchProducts = async ({
  queryKey,
  pageParam,
  signal,
}: {
  queryKey: readonly unknown[] | [string];
  pageParam?: number;
  signal?: AbortSignal | undefined;
}) => {
  // const { skip } = queryKey[1] as IProductsQueryKeys;

  console.log({ queryKey, pageParam, signal });
  return await client.products.products(
    Object.assign({}, queryKey[1], { skip: pageParam })
  );
};

const useProductsQuery = (options: Partial<IProductsQueryKeys>) => {
  return useInfiniteQuery<IProductResponse, Error>(
    [API_ENDPOINTS.QUERY_PRODUCTS, options],
    ({ queryKey, pageParam, signal }) =>
      fetchProducts({ queryKey: queryKey, pageParam, signal }),
    {
      getNextPageParam: (lastPage, allPages) => {
        // Get the total number of items from the first page of data
        const totalItems = allPages.length > 0 ? allPages[0].total : 0;

        // Calculate the skip value for the next page
        const nextSkip = allPages.length * LIMITS.PRODUCTS_LIMITS;

        // Check if there are more items to fetch
        if (nextSkip < totalItems!) {
          return nextSkip;
        }

        return undefined; // If there is no more data to fetch, return undefined
      },
    }
  );
};

export { useProductsQuery, fetchProducts };

// const fetchProjects = async ({ pageParam = 0 }) => {
//   const res = await fetch('/api/projects?cursor=' + pageParam);
//   return res.json();
// };

// const {
//   data,
//   error,
//   fetchNextPage,
//   hasNextPage,
//   isFetching,
//   isFetchingNextPage,
//   status,
// } = useInfiniteQuery({
//   queryKey: ['projects'],
//   queryFn: fetchProjects,
//   getNextPageParam: (lastPage, pages) => console.log(lastPage, pages),
// });
