import dynamic from 'next/dynamic';
import { useUI } from '@contexts/ui.context';
import { Drawer } from '@components/common/drawer/drawer';
import motionProps from '@components/common/drawer/motion';
const Cart = dynamic(() => import('@components/cart/cart'));
const OrderDetails = dynamic(() => import('@components/order/order-drawer'));

export default function ManagedDrawer() {
  const { displayDrawer, closeDrawer, drawerView } = useUI();

  return (
    <Drawer
      open={displayDrawer}
      placement={'right'}
      onClose={closeDrawer}
      // @ts-ignore
      level={null}
      contentWrapperStyle={{ right: 0 }}
      {...motionProps}
    >
      {drawerView === 'CART_SIDEBAR' && <Cart />}
      {drawerView === 'ORDER_DETAILS' && <OrderDetails />}
    </Drawer>
  );
}
