import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import Link from '@components/ui/link';
import { IoIosArrowForward } from 'react-icons/io';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import { ICategories } from 'src/types';
import { categoryImageLoader } from '@utils/image-loader';

function SidebarMenuItem({
  className,
  item,
  depth = 0,
}: {
  className?: string;
  item: ICategories;
  depth?: number;
}) {
  const { t } = useTranslation('common');
  const { cate_name_en, children: items, cate_image, cate_slug } = item;
  return (
    <>
      <li
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm hover:text-brand px-3.5 2xl:px-4 py-2.5 border-b border-border-base last:border-b-0'
        }`}
      >
        <Link
          href={{ pathname: ROUTES.SEARCH, query: { category: cate_slug } }}
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none focus:ring-0 focus:text-brand-dark'
          )}
        >
          {cate_image && (
            <div className="inline-flex w-8 shrink-0 3xl:h-auto">
              <Image
                loader={categoryImageLoader}
                src={cate_image ?? '/assets/images/category/fast-food.png'}
                alt={cate_name_en || t('text-category-thumbnail')}
                width={25}
                height={25}
                style={{ width: 'auto' }}
              />
            </div>
          )}
          <span className="capitalize ltr:pl-2.5 rtl:pr-2.5 md:ltr:pl-4 md:rtl:pr-4 2xl:ltr:pl-3 2xl:rtl:pr-3 3xl:ltr:pl-4 3xl:rtl:pr-4">
            {cate_name_en}
          </span>
          {items?.length > 0 && (
            <span className="hidden ltr:ml-auto rtl:mr-auto md:inline-flex">
              <IoIosArrowForward className="text-15px text-brand-dark text-opacity-40" />
            </span>
          )}
        </Link>
        {Array.isArray(items) && items.length > 0 ? (
          <div className="absolute top-0 z-10 invisible hidden w-full h-full border rounded-md opacity-0 md:block left-full bg-brand-light border-border-base">
            <ul key="content" className="text-xs py-1.5">
              {items?.map((currentItem) => {
                const childDepth = depth + 1;
                return (
                  <SidebarMenuItem
                    key={`${currentItem.cate_name_en}${currentItem.cate_slug}`}
                    item={currentItem}
                    depth={childDepth}
                    className={cn(
                      'text-sm px-3 py-3 ltr:pr-3 rtl:pl-3 text-brand-muted hover:text-brand border-b border-border-base last:border-b-0 mb-0.5'
                    )}
                  />
                );
              })}
            </ul>
          </div>
        ) : null}
      </li>
    </>
  );
}

function SidebarMenu({
  items,
  className,
}: {
  items: ICategories[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        'w-64 md:w-72 h-460px bg-brand-light border border-border-base rounded-md category-dropdown-menu pt-1.5',
        className
      )}
    >
      {items?.map((item: ICategories) => (
        <SidebarMenuItem key={`${item.cate_slug}-key-${item.id}`} item={item} />
      ))}
    </ul>
  );
}

export default SidebarMenu;
