import { IResponse } from 'src/types';

export interface ICartProduct {
  id: number;
  p_id: number;
  sku: string;
  p_name_en: string;
  p_name_ar: string;
  p_slug: string;
  quantity: number;
  color_en: string;
  color_ar: string;
  code: string;
  size: string;
  fabric_name_en: string;
  fabric_name_ar: string;
  discount: string;
  discount_type: string;
  special_price: string;
}

export interface ICartResponse extends IResponse {
  data?: ICartProduct[];
}
