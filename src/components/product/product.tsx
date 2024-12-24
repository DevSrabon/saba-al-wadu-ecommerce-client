import { useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useRouter } from 'next/router';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import ProductAttributes from '@components/product/product-attributes';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import { useTranslation } from 'next-i18next';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import TagLabel from '@components/ui/tag-label';
import LabelIcon from '@components/icons/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import { getVariations } from '@rest/client/get-variations';
import { useProduct } from '@rest/product';
import { useWishlist } from '@contexts/wishlist/wishlist.context';
import { useUI } from '@contexts/ui.context';
import { useModalAction } from '@components/common/modal/modal.context';

const ProductSingleDetails = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const { width } = useWindowSize();
  const { product, isLoading } = useProduct({ slug: slug as string });
  // const { data, isLoading } = useProductQuery(slug as string);
  const { addItemToCart, isInCart, getItemFromCart, isInStock, items } =
    useCart();
  const { isProductWishlist, handleWishlistClick } = useWishlist();
  const { isAuthorized } = useUI();
  const { openModal } = useModalAction();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: number }>({});
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${product.p_slug}`;
  const { price, basePrice, discount } = usePrice(
    product && {
      amount: product.base_price
        ? Number(product.base_price)
        : Number(product.base_special_price),
      baseAmount: Number(product.base_price),
      currencyCode: 'BDT',
    }
  );

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  if (isLoading) return <p>Loading...</p>;
  const variations = getVariations(attributes);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  // let selectedVariation: any = {};
  // if (isSelected) {
  //   const dataVaiOption: any = product?.attribute;
  //   selectedVariation = dataVaiOption?.find((o: any) =>
  //     isEqual(
  //       [15, 3],
  //       Object.values(attributes).sort()
  //     )
  //   );
  // }
  const variation = Object.values(attributes).sort() as number[];

  const item = generateCartItem(product, variation);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  const isOutOfStock = product.available_stock > 0 && !outOfStock;
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(product, variation);
    addItemToCart(item, quantity);
    toast('Added to the bag', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  const isFavorite = isProductWishlist(product.p_id);
  function addToWishlist() {
    // to show btn feedback while product wishlist
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
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="col-span-5 mb-6 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
          {product?.images?.length ? (
            <ThumbnailCarousel
              gallery={product?.images}
              thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
              galleryClassName="xl:w-[150px] 2xl:w-[170px]"
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={'/product-placeholder.svg'}
                alt={product?.p_name_en!}
                width={900}
                height={680}
                style={{ width: 'auto' }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:ltr:pl-2">
          <div className="pb-3 lg:pb-5">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                {product?.p_name_en}
              </h2>
            </div>
            {/* <div className="text-sm font-medium md:text-15px">
              {product?.stock_alert}
            </div> */}
            {/* {product?.unit && isEmpty(variations) ? (
              <div className="text-sm font-medium md:text-15px">
                {product?.unit}
              </div>
            ) : (
              <VariationPrice
                selectedVariation={selectedVariation}
                  minPrice={product?.min_price}
                  maxPrice={product?.max_price}
              />
            )} */}

            {/* {isEmpty(variations) && ( */}
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
            {/* )} */}
          </div>

          {/* {Object.keys(variations).map((variation) => {
            return ( */}
          <ProductAttributes
            isOutOfStock={isOutOfStock}
            variations={variations}
            attributes={attributes}
            setAttributes={setAttributes}
            colors={product?.colors}
            sizes={product?.sizes}
            variants={product?.variants}
          />
          {/* );
          })} */}

          <div className="pb-2">
            {/* check that item isInCart and place the available quantity or the item quantity */}
            {/* {isEmpty(variations) && ( */}
            <>
              {isOutOfStock ? (
                <span className="text-sm font-medium text-yellow">
                  {t('text-only') +
                    ' ' +
                    product.available_stock +
                    ' ' +
                    t('text-left-item')}
                </span>
              ) : (
                <div className="text-base text-red-500 whitespace-nowrap">
                  {t('text-out-stock')}
                </div>
              )}
            </>
            {/* )} */}

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
              onClick={addToCart}
              className="w-full px-1.5"
              disabled={!isSelected}
              loading={addToCartLoader}
            >
              <CartIcon color="#ffffff" className="ltr:mr-3" />
              {t('Add to cart')}
            </Button>
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="border"
                onClick={() =>
                  isAuthorized ? addToWishlist() : openModal('LOGIN_VIEW')
                }
                className={`group hover:text-brand ${
                  isFavorite === true && 'text-brand'
                }`}
              >
                {isFavorite === true ? (
                  <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 transition-all" />
                ) : (
                  <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 transition-all group-hover:text-brand" />
                )}

                {t('Add to wishlist')}
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
                  {t('Share text')}
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
          {product?.p_tags && (
            <ul className="pt-5 xl:pt-6">
              <li className="relative inline-flex items-center justify-center text-sm md:text-15px text-brand-dark text-opacity-80 ltr:mr-2 top-1">
                <LabelIcon className="ltr:mr-2" /> {t('text-tags')}:
              </li>
              {product?.p_tags?.split(' ').map((item: any, index: number) => (
                <li className="inline-block p-[3px]" key={index}>
                  <TagLabel data={item} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <ProductDetailsTab product={product} />
    </div>
  );
};

export default ProductSingleDetails;
