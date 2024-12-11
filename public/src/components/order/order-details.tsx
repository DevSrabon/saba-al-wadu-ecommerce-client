import { useOrderQuery } from '@framework/order/get-order';
import usePrice from '@framework/product/use-price';
import { OrderItem } from '@framework/types';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import { useOrder } from '@rest/order';
import { IPurchaseProduct } from 'src/types';
import { CreatedAt } from '@utils/date-piker';
import { firstLatter } from '@utils/content-convert';
import { Status } from '@components/ui/status';
const OrderItemCard = ({ product }: { product: IPurchaseProduct }) => {
  const { price: itemTotal } = usePrice({
    amount: product.price * product.quantity,
    currencyCode: 'BDT',
  });
  return (
    <tr
      className="font-normal border-b border-border-base last:border-b-0"
      key={product.id}
    >
      <td className="p-4">
        {product.name} * {product.quantity}
      </td>
      <td className="p-4">{itemTotal}</td>
    </tr>
  );
};
const OrderDetails: React.FC<{ className?: string }> = ({
  className = 'pt-10 lg:pt-12',
}) => {
  const { t } = useTranslation('common');
  const {
    query: { id },
  } = useRouter();
  const { order, isLoading } = useOrder(id !== undefined ? id.toString() : '');
  // const { data: order, isLoading } = useOrderQuery(id?.toString()!);
  const { price: subtotal } = usePrice(
    order && {
      amount: order.sub_total,
      currencyCode: 'BDT',
    }
  );
  const { price: total } = usePrice(
    order && {
      amount: order.grand_total,
      currencyCode: 'BDT',
    }
  );
  const { price: shipping } = usePrice(
    order && {
      amount: order.delivery_charge,
      currencyCode: 'BDT',
    }
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={className}>
      <Heading variant="heading" className="mb-6 xl:mb-7">
        {t('text-order-details')}:
      </Heading>
      <ul className="flex flex-col border rounded-md border-border-base bg-fill-secondary mb-2 md:flex-row">
        <li className="px-4 py-4 text-base font-semibold border-b border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r border-border-two lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="block text-xs font-normal leading-5 uppercase text-brand-muted">
            {t('text-order-number')}:
          </span>
          {order?.id}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-date')}:
          </span>
          {CreatedAt({ createdAt: order.order_create_date })}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-payment-status')}:
          </span>
          {order?.payment_status !== 0 ? 'Paid' : 'Unpaid'}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-order-status')}:
          </span>
          <Status
            item={order?.order_status === 'pending' ? 'Pending' : 'Delivered'}
          />
          {/* {firstLatter(order?.order_status)} */}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-payment-method')}:
          </span>
          {'Cash on delivery'}
        </li>
      </ul>
      {/************************ Order address row  *******************************/}
      <ul className="flex flex-col border rounded-md border-border-base bg-fill-secondary md:flex-row mb-7 lg:mb-8 xl:mb-10">
        <li className="px-4 py-4 text-base font-semibold border-b border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r border-border-two lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="block text-xs font-normal leading-5 uppercase text-brand-muted">
            {t('text-address-name')}:
          </span>
          {order?.address?.name}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-address-label')}:
          </span>
          {order?.address?.label}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-phone-number')}:
          </span>
          {order?.address?.phone}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-address-shipping')}:
          </span>
          {order?.address?.address}
        </li>
        <li className="px-4 py-4 text-base font-semibold border-b border-gray-300 border-dashed text-brand-dark lg:text-sm md:border-b-0 md:border-r lg:px-6 md:py-5 xl:px-4 lg:py-4 last:border-0">
          <span className="uppercase text-[11px] block text-brand-muted font-normal leading-5">
            {t('text-address-full')}:
          </span>
          {order?.address?.area_name}, {order?.address?.sub_city_name},{' '}
          {order?.address?.city_name}, {order?.address?.province_name}
        </li>
      </ul>
      <table className="w-full text-sm font-semibold text-brand-dark lg:text-base">
        <thead>
          <tr>
            <th className="w-1/2 p-4 bg-fill-secondary ltr:text-left ltr:first:rounded-tl-md">
              {t('text-product')}
            </th>
            <th className="w-1/2 p-4 bg-fill-secondary ltr:text-left ltr:last:rounded-tr-md">
              {t('text-total')}
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.products?.map((product: IPurchaseProduct, index) => (
            <OrderItemCard key={index} product={product} />
          ))}
        </tbody>
        <tfoot>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t('text-sub-total')}:</td>
            <td className="p-4">{subtotal}</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t('text-shipping')}:</td>
            <td className="p-4">
              {shipping}
              <span className="text-[13px] font-normal ltr:pl-1.5 inline-block">
                via Flat rate
              </span>
            </td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t('text-payment-method')}:</td>
            <td className="p-4">Cash on delivery</td>
          </tr>
          <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t('text-total')}:</td>
            <td className="p-4">{total}</td>
          </tr>
          {/* <tr className="odd:bg-fill-secondary">
            <td className="p-4 italic">{t('text-note')}:</td>
            <td className="p-4">{t('text-new-order')}</td>
          </tr> */}
        </tfoot>
      </table>
    </div>
  );
};

export default OrderDetails;
