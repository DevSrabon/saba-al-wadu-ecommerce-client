import isEmpty from 'lodash/isEmpty';
import { IProducts } from 'src/types';
interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}
interface Variation {
  av_id: number[];
}
type ICartItemReturnType = {
  id: string | number;
  slug: string;
  unit: unknown;
  image: string;
  stock: number;
  price: number;
  variationId?: number[];
  p_name_en: string;
  base_price: string;
};

export function generateCartItem(
  item: any,
  variation: number[]
): ICartItemReturnType {
  const {
    id,
    p_name_en,
    slug,
    images,
    price,
    sale_price,
    available_stock,
    base_price,
    unit,
  } = item;
  if (!isEmpty(variation)) {
    return {
      id,
      p_name_en,
      slug,
      unit,
      base_price,
      stock: available_stock,
      price: sale_price ? sale_price : price,
      image: images?.length ? images[0] : 'messi-1684753607065.jpg',
      variationId: variation,
    };
  }
  return {
    id,
    p_name_en,
    slug,
    unit,
    base_price,
    image: images?.length ? images[0] : 'messi-1684753607065.jpg',
    stock: available_stock,
    price: sale_price ? sale_price : price,
  };
}
