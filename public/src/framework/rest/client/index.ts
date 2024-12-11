import {
  AuthResponse,
  LoginUserInput,
  RegisterUserInput,
} from '@framework/types';
import { API_ENDPOINTS } from './api-endpoints';
import { HttpClient } from './http';
import {
  IAddAddress,
  IAddAddressResponse,
  IAreaResponse,
  IAvailableReviewProductsType,
  ICategoriesQueryKeys,
  ICategoriesResponse,
  IChangePasswordInputType,
  ICitiesResponse,
  ICreateQuestionResponseType,
  ICreateQuestionType,
  IMatchOTPInputType,
  IMatchOTPResponseType,
  INewPasswordInputType,
  IOrderResponseType,
  IOrderType,
  IOrdersResponseType,
  IProductFAQResponseType,
  IProductResponse,
  IProductReviewResponseType,
  IProductsQueryKeys,
  IProvinceResponse,
  IPurchaseOrderResponseType,
  IQuestionOfCustomerResponseType,
  IResponse,
  ISendOTPInputType,
  ISendOTPResponseType,
  ISingleProductResponseType,
  ISubCitiesResponse,
  IUpdateAddressInput,
  IUserUpdateResponse,
  IUsersResponse,
} from 'src/types';

class Client {
  users = {
    me: () => HttpClient.get<IUsersResponse>(API_ENDPOINTS.USERS_ME),
    update: (input: FormData) =>
      HttpClient.patch<IUserUpdateResponse>(API_ENDPOINTS.USERS_ME, input),
    login: (input: LoginUserInput) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_LOGIN, input),
    register: (input: RegisterUserInput) =>
      HttpClient.post<AuthResponse>(API_ENDPOINTS.USERS_REGISTER, input),
    sendOTP: (input: ISendOTPInputType) =>
      HttpClient.post<ISendOTPResponseType>(API_ENDPOINTS.SEND_OTP, input),
    matchOTP: (input: IMatchOTPInputType) =>
      HttpClient.post<IMatchOTPResponseType>(API_ENDPOINTS.MATCH_OTP, input),
    newPassword: (input: INewPasswordInputType) =>
      HttpClient.post<IMatchOTPResponseType>(
        API_ENDPOINTS.FORGET_PASSWORD,
        input
      ),
    changePassword: (input: IChangePasswordInputType) =>
      HttpClient.post<IResponse>(API_ENDPOINTS.CHANGE_PASSWORD, input),
  };
  orders = {
    create: (input: IOrderType) =>
      HttpClient.post<IOrderResponseType>(API_ENDPOINTS.PRODUCT_ORDER, input),
    list: () =>
      HttpClient.get<IOrdersResponseType>(API_ENDPOINTS.PRODUCT_ORDER),
    get: (tracking_number: string) =>
      HttpClient.get<IPurchaseOrderResponseType>(
        `${API_ENDPOINTS.PRODUCT_ORDER}/${tracking_number}`
      ),
  };
  reviews = {
    create: (input: FormData) =>
      HttpClient.post<IResponse>(API_ENDPOINTS.CREATE_REVIEW, input),
    getReview: (id: string) =>
      HttpClient.get<IProductReviewResponseType>(
        `${API_ENDPOINTS.PRODUCT_REVIEW}/${id}`
      ),
    getReviewOfCustomer: () =>
      HttpClient.get<IProductReviewResponseType>(
        `${API_ENDPOINTS.PRODUCT_REVIEW_OF_CUSTOMER}`
      ),
    getAvailableReviewProduct: () =>
      HttpClient.get<IAvailableReviewProductsType>(
        `${API_ENDPOINTS.AVAILABLE_REVIEW_PRODUCT}`
      ),
  };
  questions = {
    create: (input: ICreateQuestionType) =>
      HttpClient.post<ICreateQuestionResponseType>(
        API_ENDPOINTS.CREATE_QUESTION,
        input
      ),
    getQuestion: (id: string) =>
      HttpClient.get<IProductFAQResponseType>(
        `${API_ENDPOINTS.PRODUCT_QUESTION}/${id}`
      ),
    getQuestionOfCustomer: () =>
      HttpClient.get<IQuestionOfCustomerResponseType>(
        `${API_ENDPOINTS.CUSTOMER_QUESTION}`
      ),
  };
  address = {
    getAllProvince: () =>
      HttpClient.get<IProvinceResponse>(`${API_ENDPOINTS.GET_ALL_PROVINCE}`),
    getAllCities: (id: string) =>
      HttpClient.get<ICitiesResponse>(`${API_ENDPOINTS.GET_ALL_CITIES}${id}`),
    getAllSubCities: (id: string) =>
      HttpClient.get<ISubCitiesResponse>(
        `${API_ENDPOINTS.GET_ALL_SUB_CITIES}${id}`
      ),
    getAllArea: (id: string) =>
      HttpClient.get<IAreaResponse>(`${API_ENDPOINTS.GET_ALL_AREA}${id}`),
    addAddress: (input: IAddAddress) =>
      HttpClient.post<IAddAddressResponse>(API_ENDPOINTS.ADD_ADDRESS, input),
    update: (address: IUpdateAddressInput) =>
      HttpClient.patch<IResponse>(
        `${API_ENDPOINTS.ADD_ADDRESS}/${address.id}`,
        address.address
      ),
  };
  products = {
    popular: (params: Partial<IProductsQueryKeys>) =>
      HttpClient.get<IProductResponse>(API_ENDPOINTS.QUERY_PRODUCTS, params),
    products: ({ skip, ...params }: Partial<IProductsQueryKeys>) =>
      HttpClient.get<IProductResponse>(API_ENDPOINTS.QUERY_PRODUCTS, {
        skip: skip ?? 0,
        ...params,
      }),
    get: ({ slug }: { slug: string }) =>
      HttpClient.get<ISingleProductResponseType>(
        `${API_ENDPOINTS.QUERY_PRODUCTS}/${slug}`
      ),
  };
  categories = {
    get: (params: Partial<ICategoriesQueryKeys>) =>
      HttpClient.get<ICategoriesResponse>(
        API_ENDPOINTS.PRODUCT_CATEGORIES,
        params
      ),
  };
}

export default new Client();
