export interface IResponse {
  success: boolean;
  message?: string;
  type?: string;
  status?: number;
}
export interface IGetAllProvince {
  pro_id: number;
  pro_name_en: string;
  pro_name_bn: string;
  pro_c_id: number;
}
export interface IGetAllCities {
  cit_id: number;
  cit_name_en: string;
  cit_name_bn: string;
}
export interface IGetAllSubCities {
  scit_id: number;
  scit_name_en: string;
  scit_name_bn: string;
}
export interface IGetAllArea {
  ar_id: number;
  ar_name_bn: string;
  ar_name_en: string;
}
export interface IProvinceResponse extends IResponse {
  data: IGetAllProvince[];
}
export interface ICitiesResponse extends IResponse {
  data: IGetAllCities[];
}
export interface ISubCitiesResponse extends IResponse {
  data: IGetAllSubCities[];
}
export interface IAreaResponse extends IResponse {
  data: IGetAllArea[];
}

export interface ISendOTPInputType {
  email: string;
  type: string;
}
export interface IMatchOTPInputType {
  email: string;
  otp: string;
  type: string;
}
export interface INewPasswordInputType {
  token: string;
  password: string;
}
export interface IChangePasswordInputType {
  old_password: string;
  new_password: string;
}
export interface IMatchOTPResponseType extends IResponse {
  token?: string;
}
export interface ISendOTPResponseType extends IResponse {
  data?: { email: string };
}
export interface IAddAddress {
  label?: string;
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  ar_id: number;
}
export interface IUpdateAddressInput {
  id: string;
  address: IAddAddress;
}
export interface IAddAddressResponse {
  success: boolean;
  message: string;
  data?: {
    ecsa_id: number;
  };
}

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName?: string;
  ec_phone: string;
  ec_image: FileList;
  email: string;
  gender?: string;
  shareProfileData?: boolean;
  setAdsPerformance?: boolean;
}

export interface IGetAllAddress {
  id: number;
  label: string;
  name: string;
  phone: string;
  address: string;
  area_id: number;
  area_name: string;
  sub_city_id: number;
  sub_city_name: string;
  city_id: number;
  city_name: string;
  province_id: number;
  province_name: string;
}

export interface IUsers {
  ec_id: number;
  ec_name: string;
  ec_phone: null | number | string;
  ec_image: null | string;
  ec_email: string;
  address: IGetAllAddress[];
}

export interface IUsersResponse extends IResponse {
  data?: IUsers;
}
export interface IUserUpdateResponse extends IResponse {
  data?: {
    ec_phone?: string;
    ec_image?: string;
  };
}

export interface IProductImage {
  image_id: number;
  image_name: string;
}

export interface IProductResponse {
  success: boolean;
  data?: IProducts[];
  total?: number;
  message?: string;
  type?: string;
  status?: number;
}

export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};

export interface IProducts {
  p_id: number;
  p_name_en: string;
  p_name_ar: string;
  p_slug: string;
  p_tags: string;
  p_details_en: string;
  p_details_ar: string;
  p_status: number;
  p_created_at: Date;
  sku: string;
  barcode: string;
  qr_code: string;
  is_featured: number;
  stock_alert: number;
  avg_rating: string;
  offer_details: null;
  sizes: Size[];
  available_stock: number;
  base_price: string;
  base_special_price: string;
  all_images: string[];
  images: string[];
  colors: Color[];
  variants: Variant[];
  categories: Category[];
  p_images: Image[];
  attribute: any;
}

export interface Category {
  cate_id: number;
  cate_slug: string;
  cate_name_ar: string;
  cate_name_en: string;
}

export interface Color {
  color_id: number;
  color_code: string;
  color_images: Image[];
  color_name_ar: string;
  color_name_en: string;
}

export interface Image {
  image: string;
  image_id: number;
}

export interface Size {
  size: string;
  height: string;
  weight: string;
  details: string;
  size_id: number;
}

export interface Variant {
  discount: number;
  fabric_id: number;
  variant_id: number;
  discount_type: string;
  special_price: string;
  variant_price: number;
  fabric_name_ar: string;
  fabric_name_en: string;
  fabric_details_ar: string;
  fabric_details_en: string;
}

export interface IProductsQueryKeys {
  category: string;
  tag?: string;
  shortBy?: string;
  serialBy?: string;
  name?: string;
  skip?: number;
  limit?: number;
  pageParam?: number;
}
export interface ICategoriesQueryKeys {
  parent?: number;
  cate_name_en?: string;
}

export interface ICategories {
  id: number;
  cate_name_en: string;
  cate_name_bn: string;
  cate_slug: string;
  cate_status: number;
  cate_image: string;
  parentId: number | null;
  children: ICategories[] | [];
}

export interface ICategoriesResponse extends IResponse {
  data?: ICategories[];
}

export interface IOrderProducts {
  id: number;
  quantity: number;
  av_id?: number;
}

export interface IOrderType {
  address_id: number;
  coupon: number;
  cart_ids: number [];
}
export interface IOrderResponseType extends IResponse {
  data?: {
    order_id: number;
  };
}
export interface IOrders {
  id: number;
  order_status: string;
  payment_status: number;
  grand_total: number;
  order_date: string;
}
export interface IOrdersResponseType extends IResponse {
  data?: IOrders[];
}

export interface IPurchaseProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  av_id: null | number;
  av_value: null | string;
  attribute: null | string;
}

export interface IPurchaseOrder {
  id: number;
  order_status: string;
  payment_status: number;
  sub_total: number;
  delivery_charge: number;
  discount: number;
  grand_total: number;
  order_create_date: string;
  address: IGetAllAddress;
  products: IPurchaseProduct[];
}

export interface IPurchaseOrderResponseType extends IResponse {
  data?: IPurchaseOrder;
}

export interface ICategories {
  cate_id: number;
  cate_slug: string;
  cate_name_bn: string;
  cate_name_en: string;
}
export interface IAttributes {
  av_id: number;
  a_name: string;
  av_value: string;
}

export interface ISingleProductType {
  id: number;
  name: string;
  organic: number;
  slug: string;
  images: IProductImage[];
  price: number;
  sale_price: number;
  details: null | string;
  unit: null | string;
  available_stock: number;
  tags: string;
  categories: ICategories[];
  attribute: IAttributes[];
}
export interface ISingleProductResponseType extends IResponse {
  data?: IProducts;
}

export interface IReviewImages {
  image_id: number;
  image_name: string;
}

export interface IProductReview {
  id: number;
  rating: number;
  comment: string;
  review_images: IReviewImages[];
  created_at: string;
  customer_id: number;
  customer_name?: string;
  product_slug?: string;
  product_name?: string;
}

export interface IProductReviewResponseType extends IResponse {
  data?: IProductReview[];
}

export interface ICreateReviewType {
  rating: string;
  product_id: string;
  comment: string;
  image_1: string;
}
export interface ICreateQuestionType {
  question: string;
  product_id: number;
}
export interface ICreateQuestionResponseType extends IResponse {
  data?: { id: number };
}
export interface IProductFAQType {
  id: number;
  customer_id: number;
  customer_name: string;
  question: string;
  question_date: string;
  answer: string | null;
  answer_date: string | null;
}

export interface IProductFAQResponseType extends IResponse {
  data?: IProductFAQType[];
}
export interface IQuestionOfCustomer {
  id: number;
  product_name: string;
  product_images: IReviewImages[];
  question: string;
  question_date: string;
  answer: string | null;
  answer_date: string | null;
  status: number;
  slug: string;
}

export interface IQuestionOfCustomerResponseType extends IResponse {
  data?: IQuestionOfCustomer[];
}

export interface IAvailableReviewProducts {
  id: number;
  order_id: number;
  name: string;
  slug: string;
  images: IReviewImages[];
}
export interface IAvailableReviewProductsType extends IResponse {
  data?: IAvailableReviewProducts[];
}
