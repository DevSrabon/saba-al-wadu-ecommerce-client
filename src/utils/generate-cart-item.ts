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
  av_id: number[]
}
type ICartItemReturnType = {
  id: string | number;
  name: string,
  slug: string;
  unit: unknown;
  image: string;
  stock: number;
  price: number;
  variationId?: number[];
}

export function generateCartItem(item: any, variation: number[]): ICartItemReturnType {
  const { id, name, slug, images, price, sale_price, available_stock, unit } = item;
  if (!isEmpty(variation)) {
    return {
      id,
      name,
      slug,
      unit,
      stock: available_stock,
      price: sale_price ? sale_price : price,
      image: images?.length ? images[0]?.image_name : "messi-1684753607065.jpg",
      variationId: variation,
    };
  }
  return {
    id,
    name,
    slug,
    unit,
    image: images?.length ? images[0]?.image_name : "messi-1684753607065.jpg",
    stock: available_stock,
    price: sale_price ? sale_price : price,
  };
}
