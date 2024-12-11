import { TotalPrice } from '@components/order/price';
import ActionsButton from '@components/ui/action-button';
import Input from '@components/ui/form/input';
import { useOrdersQuery } from '@framework/order/get-all-orders';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { IOrders } from 'src/types';
import { Table } from '@components/ui/table';
import { CreatedAt } from '@utils/date-piker';

export const Status: React.FC<{ item?: any }> = ({ item }) => {
  return (
    <span className={item?.status?.name?.replace(/\s/g, '_').toLowerCase()}>
      <span
        className={`bullet ${
          item === 'Pending'
            ? 'bg-yellow-100 text-yellow-600'
            : 'bg-green-100 text-accent'
        }`}
      />
      {item}
    </span>
  );
};

const columns = [
  {
    title: 'Order Number',
    dataIndex: 'id',
    key: 'id',
    className: 'id-cell',
    width: 140,
  },
  {
    title: 'Order Date',
    dataIndex: 'order_date',
    key: 'order_date',
    width: 140,
    render: function createdAt(items: any) {
      return <CreatedAt createdAt={items} />;
    },
  },
  {
    title: 'Status',
    key: 'order_status',
    width: 145,
    render: function status(item: IOrders) {
      return (
        <Status item={item.order_status !== '0' ? 'Pending' : 'Delivered'} />
      );
    },
  },
  {
    title: 'Total Price',
    key: 'grand_total',
    width: 130,
    render: (items: IOrders) => {
      return <TotalPrice items={items} />;
    },
  },
  {
    title: 'Actions',
    // dataIndex: 'Actions',
    key: 'operations',
    width: 80,
    render: function actionsButton(item: IOrders) {
      return <ActionsButton item={item} />;
    },
    className: 'operations-cell',
  },
];

const OrderTable: React.FC = () => {
  const { data, isLoading } = useOrdersQuery({});
  const [currentPage, setCurrentPage] = useState(1);
  const [value, setValue] = useState('');
  // const countPerPage = 5;
  // let [filterData, setDataValue] = useState(orders.slice(0, countPerPage));

  // const updatePage = (p: any) => {
  //   setCurrentPage(p);
  //   const to = countPerPage * p;
  //   const from = to - countPerPage;
  //   setDataValue(orders.slice(from, to));
  // };

  // const onChangeSearch = (e: any) => {
  //   setCurrentPage(1);
  //   let filter: any = orders
  //     .filter((item: any) =>
  //       item.tracking_number
  //         .toLowerCase()
  //         .includes(e.target.value.toLowerCase())
  //     )
  //     .slice(0, countPerPage);
  //   setValue(e.target.value);
  //   if (!e.target.value) {
  //     updatePage(1);
  //   }
  //   setDataValue(filter);
  // };
  const onSubmitHandle = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl text-brand-dark md:mb-0">
          My order list
        </h2>
        {/* <form onSubmit={onSubmitHandle} className="relative">
          <span className="absolute ltr:right-3 top-[80%] transform -translate-y-1/2 order-icon-color">
            <BsSearch size={19} />
          </span>
          <Input
            name="search"
            type="search"
            value={value}
            onChange={() => {}}
            placeholder="Search Order list"
            inputClassName=" h-[46px] w-full bg-white border border-[#E3E8EC] rounded-md order-search focus:border-2 focus:outline-none focus:border-brand focus:text-brand-muted"
          />
        </form> */}
      </div>
      <div className="order-list-table-wraper">
        <Table
          className="order-list-table"
          columns={columns}
          data={[]}
          rowKey="id"
          scroll={{ x: 750 }}
        />
      </div>
      {/* {!value.trim() && (
        <div className="mt-5 ltr:text-right">
          <Pagination
            current={currentPage}
            onChange={updatePage}
            pageSize={countPerPage}
            total={orders?.length}
            prevIcon={<GrPrevious size={12} style={{ color: '#090B17' }} />}
            nextIcon={<GrNext size={12} style={{ color: '#090B17' }} />}
            className="order-table-pagination"
          />
        </div>
      )} */}
    </>
  );
};

export default OrderTable;
