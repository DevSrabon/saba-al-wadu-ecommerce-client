import React from 'react';
import { useLocalStorage } from '@utils/use-local-storage';
import { State, initialState, wishlistReducer } from './wishlist.reducer';
import { IProducts } from 'src/types';
interface WishlistProviderState extends State {
  handleWishlistClick: (item: IProducts) => void;
  isProductWishlist: (id: IProducts['id']) => any | undefined;
  resetWishlist: () => void;
}
export const wishlistContext = React.createContext<
  WishlistProviderState | undefined
>(undefined);

wishlistContext.displayName = 'WishlistContext';

export const useWishlist = () => {
  const context = React.useContext(wishlistContext);
  if (context === undefined) {
    throw new Error(`useWishlist must be used within a WishlistProvider`);
  }
  return context;
};

export function WishlistProvider(props: React.PropsWithChildren<any>) {
  const [savedWishlist, saveWishlist] = useLocalStorage(
    `memart-wishlist`,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    wishlistReducer,
    JSON.parse(savedWishlist!)
  );
  React.useEffect(() => {
    saveWishlist(JSON.stringify(state));
  }, [state, saveWishlist]);
  const isProductWishlist = (productId: number) => {
    return state.wishlist.some((item) => item.id === productId);
  };

  const handleWishlistClick = (product: IProducts) => {
    if (isProductWishlist(product.id)) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', id: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', item: product });
    }
  };
  const resetWishlist = () => dispatch({ type: 'RESET_WISHLIST' });
  const value = React.useMemo(
    () => ({
      ...state,
      isProductWishlist,
      handleWishlistClick,
      resetWishlist,
    }),
    [isProductWishlist, state]
  );
  return <wishlistContext.Provider value={value} {...props} />;
}
