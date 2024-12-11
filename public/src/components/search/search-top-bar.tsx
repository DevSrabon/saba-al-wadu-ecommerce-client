import { Drawer } from '@components/common/drawer/drawer';
import FilterIcon from '@components/icons/filter-icon';
import { useUI } from '@contexts/ui.context';
import FilterSidebar from '@components/search/filter-sidebar';
import ListBox from '@components/ui/filter-list-box';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import motionProps from '@components/common/drawer/motion';
import { LIMITS } from '@rest/client/limits';
import { useProductsQuery } from '@rest/get-all-products';

export default function SearchTopBar() {
  const { openFilter, displayFilter, closeFilter } = useUI();

  const { t } = useTranslation('common');
  const { query } = useRouter();
  const { data } = useProductsQuery({
    limit: LIMITS.PRODUCTS_LIMITS,
    ...query,
  });
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        className="flex items-center px-4 py-2 text-sm font-semibold transition duration-200 ease-in-out border rounded-md lg:hidden text-brand-dark border-border-base focus:outline-none hover:border-brand hover:text-brand"
        onClick={openFilter}
      >
        <FilterIcon />
        <span className="ltr:pl-2.5 rtl:pr-2.5">{t('text-filters')}</span>
      </button>
      <div className="flex items-center justify-end w-full lg:justify-between">
        <div className="shrink-0 text-brand-dark font-medium text-15px leading-4 md:ltr:mr-6 md:rtl:ml-6 hidden lg:block mt-0.5">
          {data?.pages[0].total} {t('text-items-found')}
        </div>
        <ListBox
          options={[
            { name: 'text-none-price', value: 'none' },
            { name: 'text-lowest-price', value: 'ep_sale_price' },
            { name: 'text-highest-price', value: 'desc' },
            { name: 'text-new-arrival', value: 'p_created_at' },
            // { name: 'text-most-order', value: 'most-order' },
          ]}
        />
      </div>
      {/*TODO: multiple drawer uses throughout the app is a bad practice */}
      <Drawer
        placement={'left'}
        open={displayFilter}
        onClose={closeFilter}
        // @ts-ignore
        level={null}
        contentWrapperStyle={{ left: 0 }}
        {...motionProps}
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
}
