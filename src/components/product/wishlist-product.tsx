import WishlistProductCard from '@components/product/wishlist-product-card';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useWishlist } from '@contexts/wishlist/wishlist.context';
import { IProducts } from 'src/types';

interface ProductWishlistProps {
  className?: string;
}

export default function ProductWishlistGrid({
  className = '',
}: ProductWishlistProps) {
  const { wishlist } = useWishlist();
  return (
    <div className={cn(className)}>
      {wishlist?.length === 0 ? (
        <Alert
          borderColor="border-brand"
          textColor="text-brand"
          message={'Wishlist is empty'}
        />
      ) : (
        <div className="flex flex-col">
          {wishlist?.map((product: IProducts) => (
            <WishlistProductCard
              key={`product--key${product.id}`}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
