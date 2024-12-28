import { Item } from '@contexts/cart/cart.utils';
import Image from '@components/ui/image';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import usePrice from '@framework/product/use-price';
import { productImageLoader } from '@utils/image-loader';
import { ICartProduct } from '@components/cart/types/cartTypes';

export const CheckoutItem: React.FC<{ item: ICartProduct }> = ({ item }) => {
  // console.log(item.attributes)
  return (
    <div className="flex items-center py-4 border-b border-border-base ">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
        <Image
          loader={productImageLoader}
          src={item?.p_name_en ?? '/assets/placeholder/cart-item.svg'}
          alt={item.p_name_en || 'Product Image'}
          className="rounded-md ltr:mr-5"
          width={64}
          height={64}
          style={{ width: 'auto' }}
        />
        {/* <Image
          src={item.image ?? '/assets/placeholder/order-product.svg'}
          alt={'item image'}
          className="rounded-md ltr:mr-5"
          width={64}
          height={64}
          style={{ width: 'auto' }}
        /> */}
      </div>
      <h6 className="font-normal text-15px text-brand-dark ltr:pl-3">
        {item.p_name_en}
        {/* {generateCartItemName(item.name, item.attributes)} */}
      </h6>
      <div className="flex font-normal ltr:ml-auto text-15px text-brand-dark ltr:pl-2 shrink-0">
        {Number(item.special_price) * item.quantity}
      </div>
    </div>
  );
};
