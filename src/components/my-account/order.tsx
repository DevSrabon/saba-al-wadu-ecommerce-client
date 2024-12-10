import Layout from '@components/layout/layout';
import { getLayout } from '@components/layout/layout-five';
import OrderTable from '@components/order/order-table';
import { useOrdersQuery } from '@framework/order/get-all-orders';

export default function OrdersTablePage() {
  const { data, isLoading } = useOrdersQuery({});
  return (
    <div className="pt-4">
      {!isLoading ? <OrderTable orders={data?.data} /> : <div>Loading...</div>}
    </div>
  );
}

OrdersTablePage.getLayout = getLayout;
