import { IProducts } from 'src/types';
interface Metadata {
  [key: string]: any;
}

type Action =
  | { type: 'ADD_TO_WISHLIST'; item: IProducts }
  | { type: 'REMOVE_FROM_WISHLIST'; id: IProducts['id'] }
  | { type: 'RESET_WISHLIST' };

export interface State {
  wishlist: IProducts[];
  meta?: Metadata | null;
}
export const initialState: State = {
  wishlist: [],
  meta: null,
};
export function wishlistReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      return { ...state, wishlist: [...state.wishlist, action.item] };
    }
    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        wishlist: state.wishlist.filter((product) => product.id !== action.id),
      };
    }
    case 'RESET_WISHLIST':
      return initialState;
    default:
      return state;
  }
}
