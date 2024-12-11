import { Table } from '@components/ui/table';
import Input from '@components/ui/form/input';
import { useState } from 'react';
import Pagination from '@components/ui/pagination';
import ActionsButton from '@components/ui/action-button';
import { TotalPrice } from '@components/order/price';
import { BsSearch } from 'react-icons/bs';
import {
  IAvailableReviewProducts,
  IOrders,
  IProductReview,
  IQuestionOfCustomer,
} from 'src/types';
import { CreatedAt } from '@utils/date-piker';
import StarIcon from '@components/icons/star-icon';
import { ProductRating } from '@utils/product-rating';
import Avatar from '@components/ui/avatar';
import Link from '@components/ui/link';
import { productImageLoader } from '@utils/image-loader';
import WriteReviewActionsButton from '@components/ui/write-review-action-button';

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
    title: 'Order ID',
    dataIndex: 'order_id',
    key: 'order_id',
  },
  {
    title: 'Product name',
    key: 'order_id',
    render: (item: IAvailableReviewProducts) => {
      return (
        <Link href={`/products/${item.slug}`}>
          <div className="flex items-center cursor-pointer">
            <Avatar
              loader={productImageLoader}
              className="rounded-full overflow-hidden w-[30px] h-[30px]"
              title={item.name}
              src={item.images && item?.images[0]?.image_name}
            />
            <span className="pl-2 text-brand">{item.name}</span>
          </div>
        </Link>
      );
    },
  },
  {
    title: 'Actions',
    key: 'order_id',
    render: function actionsButton(item: IOrders) {
      return <WriteReviewActionsButton item={item} />;
    },
    className: 'operations-cell',
  },
];

const WriteProductReviewTable: React.FC<{
  availableReviewProducts: IAvailableReviewProducts[];
}> = ({ availableReviewProducts }) => {
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
          Write product review
        </h2>
        {/* <form onSubmit={onSubmitHandle} className="relative">
          <span className="absolute ltr:right-3 rtl:left-3 top-[80%] transform -translate-y-1/2 order-icon-color">
            <BsSearch size={19} />
          </span>
          <Input
            name="search"
            type="search"
            value={value}
            onChange={() => { }}
            placeholder="Search product list"
            inputClassName=" h-[46px] w-full bg-white border border-[#E3E8EC] rounded-md order-search focus:border-2 focus:outline-none focus:border-brand focus:text-brand-muted"
          />
        </form> */}
      </div>
      <div className="order-list-table-wraper">
        <Table
          className="order-list-table"
          columns={columns}
          data={availableReviewProducts}
          rowKey="order_id"
          // scroll={{ x: 750 }}
        />
      </div>
      {/* {!value.trim() && (
        <div className="mt-5 ltr:text-right rtl:text-left">
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

export default WriteProductReviewTable;
