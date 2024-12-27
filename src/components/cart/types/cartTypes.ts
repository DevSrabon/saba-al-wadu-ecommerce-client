import { IResponse } from 'src/types';

export interface ICartProduct {
  id: number;
  p_id: number;
  sku: string;
  p_name_en: string;
  p_name_ar: string;
  p_slug: string;
  v_id: number;
  p_color_id: number;
  size_id: number;
  quantity: number;
  color_en: string;
  color_ar: null;
  code: string;
  size: string;
  fabric_name_en: string;
  fabric_name_ar: null;
  discount: string;
  discount_type: string;
  special_price: string;
  totalPrice:number
}

export interface ICartResponse extends IResponse {
  data?: ICartProduct[];
}
