import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useTranslation } from 'next-i18next';
import Router from 'next/router';
import { ROUTES } from '@utils/routes';
import { IOrderProducts, IOrderType } from 'src/types';
import { useCreateOrder } from '@rest/order';
import FormAlert from '@components/ui/form-alert';
import { useToken } from 'src/lib/hooks/use-token';
import { useUI } from '@contexts/ui.context';
import { useEffect, useState } from 'react';

const CheckoutCard: React.FC = () => {
  const { t } = useTranslation('common');
  const { isAuthorized } = useUI();
  const { items, total, isEmpty, addressItem } = useCart();
  const { mutate, isLoading, formError, setFormError } = useCreateOrder();
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'BDT',
  });
  const deliveryCharge = addressItem.province_id !== 6 ? 120 : 80;
  const { price: finalTotal } = usePrice({
    amount: total + deliveryCharge,
    currencyCode: 'BDT',
  });
  function orderHeader() {
    const products: IOrderProducts[] = [];
    if (!isEmpty) {
      for (let index = 0; index < items.length; index++) {
        products.push({
          id: Number(items[index]?.id),
          quantity: items[index].quantity!,
        });
      }
    }
    const body: IOrderType = {
      address_id: addressItem.id,
      delivery_charge: deliveryCharge,
      products: products,
    };

    mutate(body);
    // !isEmpty && Router.push(ROUTES.ORDER);
  }

  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: subtotal,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: `৳${deliveryCharge}`,
    },
    {
      id: 3,
      name: t('text-total'),
      price: finalTotal,
    },
  ];

  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  // if (typeof window === 'undefined') {
  //   return null;
  // }

  return (
    <>
      <div className="px-4 py-1 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t('text-product')}
          </span>
          <span className="font-medium ltr:ml-auto shrink-0 text-15px text-brand-dark">
            {t('text-sub-total')}
          </span>
        </div>
        {!isEmpty ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('text-empty-cart')}
          </p>
        )}
        {checkoutFooter.map((item: any) => (
          <CheckoutCardFooterItem item={item} key={item.id} />
        ))}
        {/* {!addressItem.id && <FormAlert message={"Please you must select a order address"} variant='error' closeable={true}
          onClose={() => setFormError(null)} />} */}

        {(!isAuthorized && (
          <FormAlert
            message={'Please login your account before a place order'}
            variant="error"
            closeable={true}
            onClose={() => setFormError(null)}
          />
        )) ||
          (!addressItem.id && (
            <FormAlert
              message={'Please you must select a order address'}
              variant="error"
              closeable={true}
              onClose={() => setFormError(null)}
            />
          ))}

        <FormAlert
          message={formError?.message!}
          variant="warningOutline"
          closeable={true}
          onClose={() => setFormError(null)}
        />
        <Button
          variant="formButton"
          loading={isLoading}
          type="submit"
          disabled={isLoading || !isAuthorized || !addressItem.id || isEmpty}
          className={`w-full mt-8 mb-5 bg-brand text-brand-light rounded font-semibold px-4 py-3 transition-all ${
            isEmpty &&
            isLoading &&
            !isAuthorized &&
            !addressItem &&
            'opacity-40 cursor-not-allowed'
          }`}
          onClick={() => orderHeader()}
        >
          {t('button-order-now')}
        </Button>
      </div>
      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={ROUTES.TERMS} legacyBehavior>
          <a className="font-medium underline text-brand">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={ROUTES.PRIVACY} legacyBehavior>
          <a className="font-medium underline text-brand">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
      <Text className="mt-4">{t('text-bag-fee')}</Text>
    </>
  );
};

export default CheckoutCard;
