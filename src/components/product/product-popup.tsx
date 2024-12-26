import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import ProductAttributes from '@components/product/product-attributes';
import { generateCartItem } from '@utils/generate-cart-item';
import usePrice from '@framework/product/use-price';
import { useTranslation } from 'next-i18next';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import SocialShareBox from '@components/ui/social-share-box';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { getVariations } from '@rest/client/get-variations';
import { useWishlist } from '@contexts/wishlist/wishlist.context';
import { useUI } from '@contexts/ui.context';
import { useAddCardOrFavorite } from 'src/framework/addCardOrFavorite';

const breakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

export default function ProductPopup() {
  const { t } = useTranslation('common');
  const { data } = useModalState();
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const { isProductWishlist, handleWishlistClick } = useWishlist();
  const { isAuthorized } = useUI();
  const { openModal } = useModalAction();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: number }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const { price, basePrice, discount } = usePrice({
    amount: data?.base_special_price
      ? Number(data?.base_special_price)
      : Number(data?.base_price),
    baseAmount: Number(data?.base_price),
    currencyCode: 'BDT',
  });
  const {
    slug,
    images,
    p_name_en,
    p_name_ar,
    unit,
    attribute,
    details,
    tags,
    available_stock,
  } = data;
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${slug}`;
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  const variations = getVariations(attribute);
  const variation = Object.values(attributes).sort() as number[];

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  const item = generateCartItem(data, variation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  const isOutOfStock = available_stock > 0 && !outOfStock;
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    addItemToCart(item, selectedQuantity);
    // @ts-ignore
    toast(t('text-added-bag'), {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  const isFavorite = isProductWishlist(data.id);
  function addToWishlist() {
    handleWishlistClick(data);
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

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${slug}`);
  }

  useEffect(() => setSelectedQuantity(1), [data.id]);

  console.log(item, selectedQuantity, attributes);

  const { mutate, isLoading } = useAddCardOrFavorite();

  const submitBackend = () => {
    const cartData = {
      p_id: item.id,
      v_id: attributes.variant,
      p_color_id: attributes.color,
      size_id: attributes.size,
      quantity: selectedQuantity,
      type: 'cart',
    };

    console.log({ cartData });

    mutate(cartData);
  };
  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-4 pt-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 md:pt-7 2xl:pt-10">
          <div className="items-start justify-between lg:flex">
            <div className="items-center justify-center mb-6 overflow-hidden xl:flex md:mb-8 lg:mb-0">
              {images?.length ? (
                <ThumbnailCarousel gallery={images} />
              ) : (
                <div className="flex items-center justify-center w-auto">
                  <Image
                    src={productGalleryPlaceholder}
                    alt={p_name_en!}
                    width={650}
                    height={590}
                    style={{ width: 'auto' }}
                  />
                </div>
              )}
            </div>

            <div className="shrink-0 flex flex-col lg:ltr:pl-5 xl:ltr:pl-8 2xl:ltr:pl-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <div
                  className="mb-2 md:mb-2.5 block -mt-1.5"
                  onClick={navigateToProductPage}
                  role="button"
                >
                  <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand">
                    {p_name_en}
                  </h2>
                </div>
                {unit && (
                  <div className="text-sm font-medium md:text-15px">{unit}</div>
                )}
                {/* {unit && isEmpty(variations) ? (
                  <div className="text-sm font-medium md:text-15px">{unit}</div>
                ) : (
                  <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={data.min_price}
                    maxPrice={data.max_price}
                  />
                )} */}

                <div className="flex items-center mt-5">
                  <div className="text-brand-dark font-bold text-base md:text-xl xl:text-[22px]">
                    {price}
                  </div>
                  {discount && (
                    <>
                      <del className="text-sm text-opacity-50 md:text-15px ltr:pl-3 text-brand-dark ">
                        {basePrice}
                      </del>
                      <span className="inline-block rounded font-bold text-xs md:text-sm bg-brand-tree bg-opacity-20 text-brand-tree uppercase px-2 py-1 ltr:ml-2.5">
                        {discount} {t('text-off')}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ProductAttributes
                isOutOfStock={isOutOfStock}
                variations={variations}
                attributes={attributes}
                setAttributes={setAttributes}
                colors={data?.colors}
                sizes={data?.sizes}
                variants={data?.variants}
              />

              <div className="pb-2">
                {/* check that item isInCart and place the available quantity or the item quantity */}

                {isOutOfStock ? (
                  <span className="text-sm font-medium text-yellow">
                    {t('text-only') +
                      ' ' +
                      available_stock +
                      ' ' +
                      t('text-left-item')}
                  </span>
                ) : (
                  <div className="text-base text-brand-danger whitespace-nowrap">
                    {t('text-out-stock')}
                  </div>
                )}
                {/* {!isEmpty(selectedVariation) && (
                  <span className="text-sm font-medium text-yellow">
                    {selectedVariation?.is_disable ||
                      selectedVariation.quantity === 0
                      ? t('text-out-stock')
                      : `${t('text-only') +
                      ' ' +
                      selectedVariation.quantity +
                      ' ' +
                      t('text-left-item')
                      }`}
                  </span>
                )} */}
              </div>

              <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                <Counter
                  variant="single"
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disabled={
                    isInCart(item.id)
                      ? getItemFromCart(item.id).quantity + selectedQuantity >=
                        Number(item.stock)
                      : selectedQuantity >= Number(item.stock)
                  }
                />
                <Button
                  onClick={() => {
                    // addToCart();
                    submitBackend();
                  }}
                  className="w-full px-1.5"
                  title={!isSelected ? 'Select product attribute' : ''}
                  disabled={!isSelected}
                  loading={isLoading}
                >
                  <CartIcon color="#ffffff" className="ltr:mr-3" />
                  {t('text-add-to-cart')}
                </Button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button
                    variant="border"
                    onClick={() =>
                      isAuthorized ? submitBackend() : openModal('LOGIN_VIEW')
                    }
                    // loading={addToWishlistLoader}
                    className={`group hover:text-brand ${
                      isFavorite === true && 'text-brand'
                    }`}
                  >
                    {isFavorite === true ? (
                      <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 transition-all" />
                    ) : (
                      <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 transition-all group-hover:text-brand" />
                    )}

                    {t('text-wishlist')}
                  </Button>
                  <div className="relative group">
                    <Button
                      variant="border"
                      className={`w-full hover:text-brand ${
                        shareButtonStatus === true && 'text-brand'
                      }`}
                      onClick={handleChange}
                    >
                      <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 transition-all group-hover:text-brand" />
                      {t('text-share')}
                    </Button>
                    <SocialShareBox
                      className={`absolute z-10 ltr:right-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                        shareButtonStatus === true
                          ? 'visible opacity-100 top-full'
                          : 'opacity-0 invisible top-[130%]'
                      }`}
                      shareUrl={productUrl}
                    />
                  </div>
                </div>
              </div>
              {tags && (
                <ul className="pt-5 xl:pt-6">
                  <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 top-1">
                    <LabelIcon className="ltr:mr-2" /> {t('text-tags')}:
                  </li>
                  {tags?.split(' ').map((item: any, index: string) => (
                    <li className="inline-block p-[3px]" key={index}>
                      <TagLabel data={item} />
                    </li>
                  ))}
                </ul>
              )}

              <div className="pt-6 xl:pt-8">
                <Heading className="mb-3 lg:mb-3.5">
                  {t('text-product-details')}:
                </Heading>
                <Text variant="small">
                  {details && details.split(' ').slice(0, 40).join(' ')}
                  {'...'}
                  <span
                    onClick={navigateToProductPage}
                    role="button"
                    className="text-brand ltr:ml-0.5"
                  >
                    {t('text-read-more')}
                  </span>
                </Text>
              </div>
            </div>
          </div>
        </div>
        <RelatedProductFeed
          carouselBreakpoint={breakpoints}
          className="mb-0.5 md:mb-2 lg:mb-3.5 xl:mb-4 2xl:mb-6"
        />
      </div>
    </div>
  );
}
