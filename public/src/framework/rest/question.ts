import { useMutation, useQuery, useQueryClient } from "react-query";
import client from "./client";
import { API_ENDPOINTS } from "./client/api-endpoints";
import { IProductFAQResponseType, IProductFAQType, IQuestionOfCustomer, IQuestionOfCustomerResponseType } from "src/types";

export function useCreateQuestion() {
  // const { t } = useTranslation('common');
  // const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  const { mutate: createQuestion, isLoading } = useMutation(
    client.questions.create,
    {
      onSuccess: (res) => {
        // toast.success(t('text-review-request-submitted'));
      },
      onSettled: () => {
        queryClient.invalidateQueries([API_ENDPOINTS.PRODUCT_QUESTION]);
        // closeModal();
      },
    }
  );
  return {
    createQuestion,
    isLoading,
  };
}

export function useProductQuestion(id: string) {
  const { data, isLoading, error } = useQuery<IProductFAQResponseType, Error>(
    [API_ENDPOINTS.PRODUCT_QUESTION, { id }],
    () => client.questions.getQuestion(id as string)
  );
  return {
    questions: data?.data || [] as IProductFAQType[],
    isLoading,
    error,
  };
}

export function useQuestionOfCustomer() {
  const { data, isLoading, error } = useQuery<IQuestionOfCustomerResponseType, Error>(
    [API_ENDPOINTS.PRODUCT_REVIEW_OF_CUSTOMER],
    () => client.questions.getQuestionOfCustomer(), {refetchOnWindowFocus: false}
  );
  return {
    questionsOfCustomer: data?.data || [] as IQuestionOfCustomer[],
    isLoading,
    error,
  };
}