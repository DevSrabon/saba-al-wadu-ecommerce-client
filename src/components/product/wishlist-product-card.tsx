import { useState } from 'react';
import type { FC } from 'react';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { useTranslation } from 'next-i18next';
import { IProducts } from 'src/types';
import { productImageLoader } from '@utils/image-loader';
import Link from 'next/link';
import { useWishlist } from '@contexts/wishlist/wishlist.context';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

interface ProductProps {
  product: IProducts;
  className?: string;
}

const WishlistProductCard: FC<ProductProps> = ({ product, className }) => {
  const { t } = useTranslation('common');
  const { isProductWishlist, handleWishlistClick } = useWishlist();
  const { p_name_en, images, p_slug } = product ?? {};
  const placeholderImage = `/assets/placeholder/product.svg`;
  const { price, basePrice, discount } = usePrice({
    amount: product.base_price
      ? Number(product.base_price)
      : Number(product.base_special_price),
    baseAmount: Number(product.base_price),
    currencyCode: 'BDT',
  });
  const { width } = useWindowSize();
  const isFavorite = isProductWishlist(product.p_id);

  function addToWishlist() {
    handleWishlistClick(product);
    const toastStatus: string =
      isFavorite === true
        ? t('text-remove-favorite')
        : t('text-added-favorite');
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <div className="flex flex-col py-4 border-b md:flex-row border-border-base 2xl:py-5 wishlist-card last:pb-0 first:-mt-8 lg:first:-mt-4 2xl:first:-mt-7">
      <Link href={`/products/${p_slug}`} className="flex ">
        <div className="relative mt-1 shrink-0">
          <div className="flex overflow-hidden max-w-[80px]  transition duration-200 ease-in-out transform group-hover:scale-105">
            <Image
              loader={productImageLoader}
              src={images[0] || placeholderImage}
              alt={p_name_en || 'Product Image'}
              width={80}
              height={80}
              quality={100}
              style={{ width: 'auto' }}
              className="object-cover bg-fill-thumbnail"
            />
          </div>
        </div>

        <div className="flex flex-col ltr:ml-2 rtl:mr-2 2xl:ltr:ml-3.5 2xl:rtl:mr-3.5 h-full">
          <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
            {p_name_en}
          </h2>
          <div className="-mx-1">
            <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
              {price}
            </span>
            {discount && (
              <del className="mx-1 text-sm text-opacity-50 text-brand-dark">
                {basePrice}
              </del>
            )}
          </div>
        </div>
      </Link>
      <div
        className="flex cursor-pointer ltr:ml-auto rtl:mr-auto md:pt-7"
        onClick={addToWishlist}
      >
        {!isFavorite ? (
          <>
            <IoIosHeartEmpty className="w-5 h-5 mt-0.5" />

            <span className=" ltr:ml-3 rtl:mr-3 text-brand-dark font-medium text-15px -mt-0.5 md:mt-0">
              {t('text-favorite')}
            </span>
          </>
        ) : (
          <>
            <IoIosHeart className="text-brand w-5 h-5 mt-0.5" />
            <span className="text-brand ltr:ml-3 rtl:mr-3 font-semibold text-15px -mt-0.5 md:mt-0">
              {t('text-favorited')}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistProductCard;
