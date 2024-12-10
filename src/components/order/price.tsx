import usePrice from '@framework/product/use-price';
import { calculateTotal } from '@contexts/cart/cart.utils';
import { IOrders } from 'src/types';

export const TotalPrice: React.FC<{ items?: IOrders }> = ({ items }) => {
  const { price } = usePrice({
    amount: items?.grand_total!,
    currencyCode: 'BDT',
  });
  return <span className="total_price">{price}</span>;
};

export const DiscountPrice = (discount: any) => {
  const { price } = usePrice({
    amount: discount?.discount,
    currencyCode: 'BDT',
  });
  return <>-{price}</>;
};

export const DeliveryFee = (delivery: any) => {
  const { price } = usePrice({
    amount: delivery?.delivery,
    currencyCode: 'BDT',
  });
  return <>{price}</>;
};

export const SubTotalPrice: React.FC<{ items?: any }> = ({ items }) => {
  const { price } = usePrice({
    amount: calculateTotal(items),
    currencyCode: 'BDT',
  });
  return <>{price}</>;
};
