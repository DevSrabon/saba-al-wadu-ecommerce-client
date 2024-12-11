import { useMutation, useQuery, useQueryClient } from "react-query";
import client from "./client";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { IAvailableReviewProducts, IAvailableReviewProductsType, IProductReview, IProductReviewResponseType } from "src/types";
import { useModalAction } from "@components/common/modal/modal.context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function useCreateReview() {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  const { mutate: createReview, isLoading, isSuccess } = useMutation(
    client.reviews.create,
    {
      onSuccess: (res) => {
        toast.success(t('text-review-request-submitted'));
      },
      onSettled: () => {
        queryClient.invalidateQueries([API_ENDPOINTS.PRODUCT_REVIEW]);
        queryClient.invalidateQueries([API_ENDPOINTS.AVAILABLE_REVIEW_PRODUCT]);
        closeModal();
      },
    }
  );
  return {
    createReview,
    isLoading,
    isSuccess
  };
}
export function useProductReview(id: string) {
  const { data, isLoading, error } = useQuery<IProductReviewResponseType, Error>(
    [API_ENDPOINTS.PRODUCT_REVIEW, { id }],
    () => client.reviews.getReview(id as string)
  );
  return {
    reviews: data?.data || [] as IProductReview[],

    isLoading,
    error,
  };
}
export function useProductReviewOfCustomer() {
  const { data, isLoading, error } = useQuery<IProductReviewResponseType, Error>(
    [API_ENDPOINTS.PRODUCT_REVIEW_OF_CUSTOMER],
    () => client.reviews.getReviewOfCustomer(), {refetchOnWindowFocus: false}
  );
  return {
    reviewsOfCustomer: data?.data || [] as IProductReview[],
    isLoading,
    error,
  };
}
export function useAvailableReviewProducts() {
  const { data, isLoading, error } = useQuery<IAvailableReviewProductsType, Error>(
    [API_ENDPOINTS.AVAILABLE_REVIEW_PRODUCT],
    () => client.reviews.getAvailableReviewProduct(), {refetchOnWindowFocus: false}
  );
  return {
    availableReviewProducts: data?.data || [] as IAvailableReviewProducts[],
    isLoading,
    error,
  };
}