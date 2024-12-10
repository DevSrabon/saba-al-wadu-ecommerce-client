import { Item } from '@contexts/cart/cart.utils';
import Image from '@components/ui/image';
import { generateCartItemName } from '@utils/generate-cart-item-name';
import usePrice from '@framework/product/use-price';
import { productImageLoader } from '@utils/image-loader';

export const CheckoutItem: React.FC<{ item: Item }> = ({ item }) => {
  const { price } = usePrice({
    amount: item?.itemTotal,
    currencyCode: 'BDT',
  });
  // console.log(item.attributes)
  return (
    <div className="flex items-center py-4 border-b border-border-base ">
      <div className="flex w-16 h-16 border rounded-md border-border-base shrink-0">
        <Image
          loader={productImageLoader}
          src={item?.image ?? '/assets/placeholder/cart-item.svg'}
          alt={item.name || 'Product Image'}
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
        {item.name}
        {/* {generateCartItemName(item.name, item.attributes)} */}
      </h6>
      <div className="flex font-normal ltr:ml-auto text-15px text-brand-dark ltr:pl-2 shrink-0">
        {price}
      </div>
    </div>
  );
};
