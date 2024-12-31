import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import client from './client';
import { useRouter } from 'next/router';
import {
  IOrderResponseType,
  IOrders,
  IOrdersResponseType,
  IPurchaseOrder,
  IPurchaseOrderResponseType,
} from 'src/types';
import { ROUTES } from '@utils/routes';
import { API_ENDPOINTS } from './client/api-endpoints';

export function useCreateOrder() {
  let [formError, setFormError] = useState<Partial<IOrderResponseType> | null>(
    null
  );
  const router = useRouter();

  const { mutate, isLoading, data } = useMutation(client.orders.create, {
    onSuccess: (data: any) => {
      if (data?.success) {
        // Router.push(ROUTES.ORDER(data?.data?.order_id?.toString()!))
        window.location.href = data?.data?.redirect_url;
        // router.push({
        //   pathname: ROUTES.ORDER,
        //   query: { id: data?.data?.order_id?.toString() },
        // });
        return;
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
      setFormError(data);
      // toast.error(data.message);
    },
  });

  return { mutate, data, isLoading, formError, setFormError };
}

export function useOrders() {
  const { data, isLoading, error } = useQuery<IOrdersResponseType, Error>(
    [API_ENDPOINTS.PRODUCT_ORDER,'cart'],
    () => client.orders.list(),
    { refetchOnWindowFocus: false }
  );
  return {
    orders: data?.data || ([] as IOrders[]),
    isLoading,
    error,
  };
}

export function useOrder(tracking_number: string) {
  const { data, isLoading, error } = useQuery<
    IPurchaseOrderResponseType,
    Error
  >(
    [API_ENDPOINTS.PRODUCT_ORDER, tracking_number],
    () => client.orders.get(tracking_number),
    { refetchOnWindowFocus: false }
  );
  return {
    order: data?.data || ({} as IPurchaseOrder),
    isLoading,
    error,
  };
}
