import Counter from '@components/ui/counter';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { useCart } from '@contexts/cart/cart.context';
import { productImageLoader } from '@utils/image-loader';
import { ROUTES } from '@utils/routes';
import { Dispatch, SetStateAction } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { useAddCardOrFavorite } from 'src/framework/addCardOrFavorite';
import { ICartProduct } from './types/cartTypes';

type CartItemProps = {
  item: ICartProduct;
  setCartProducts: Dispatch<SetStateAction<ICartProduct[]>>;
  cartProducts: ICartProduct[];
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  setCartProducts,
  cartProducts,
}) => {
  const { mutate, isLoading: submitLoading } = useAddCardOrFavorite();
  const { clearItemFromCart } = useCart();
  // const { price: totalPrice } = usePrice({
  //   amount: Number(item?.special_price),
  //   currencyCode: 'BDT',
  // });
  // const outOfStock = !isInStock(item.id);

  const handelIncrement = () => {
    const updatedCartProducts: ICartProduct[] = cartProducts?.map((product) =>
      product.id === item?.id
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    );

    setCartProducts(updatedCartProducts);
    const cartData = {
      p_id: item.id,
      v_id: item.v_id,
      p_color_id: item.p_color_id,
      size_id: item.size,
      quantity: item.quantity,
      mode: 'increment',
      type: 'cart',
    };
    mutate(cartData);
  };
  const handleDecrement = () => {
    const updatedCartProducts: ICartProduct[] = cartProducts
      ?.map((product) =>
        product.id === item.id && product.quantity > 0
          ? {
              ...product,
              quantity: product.quantity - 1,
            }
          : product
      )
      ?.filter((product) => product.quantity > 0);

    setCartProducts(updatedCartProducts);
    const cartData = {
      p_id: item.id,
      v_id: item.v_id,
      p_color_id: item.p_color_id,
      size_id: item.size,
      quantity: item.quantity,
      mode: 'decrement',
      type: 'cart',
    };
    mutate(cartData);
  };

  return (
    <div
      className={`group w-full h-auto flex justify-start items-center text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0`}
      title={item?.p_name_en}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          loader={productImageLoader}
          src={item?.p_name_en ?? '/assets/placeholder/cart-item.svg'}
          alt={item.p_name_en || 'Product Image'}
          width={100}
          height={100}
          quality={100}
          style={{ width: 'auto' }}
          className="object-cover bg-fill-thumbnail"
          priority
          loading="eager"
        />
        {/* <Image
          src={item?.image ?? '/assets/placeholder/cart-item.svg'}
          width={100}
          height={100}
          loading="eager"
          alt={item.name || 'Product Image'}
          style={{ width: 'auto' }}
          className="object-cover bg-fill-thumbnail"
        /> */}
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.id)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="ltr:pl-3 md:ltr:pl-4">
          <Link
            href={`${ROUTES.PRODUCT}/${item?.p_slug}`}
            className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
          >
            {item?.p_name_en}
          </Link>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
            {item.quantity}
          </div>
          <Counter
            value={item.quantity}
            onIncrement={handelIncrement}
            onDecrement={handleDecrement}
            variant="cart"
            disabled={false}
          />
        </div>

        <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end">
          {(item?.quantity * Number(item?.special_price)).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
