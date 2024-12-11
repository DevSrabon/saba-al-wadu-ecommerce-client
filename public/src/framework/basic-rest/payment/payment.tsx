import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@rest/client/api-endpoints';
import { useQuery } from 'react-query';

const fetchPayment = async () => {
  const { data } = await http.get(API_ENDPOINTS.PAYMENT);
  return {
    data: data,
  };
};

const usePaymentQuery = () => {
  return useQuery([API_ENDPOINTS.PAYMENT], fetchPayment);
};

export { usePaymentQuery, fetchPayment };
