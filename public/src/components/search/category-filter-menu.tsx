import { useRouter } from 'next/router';
import cn from 'classnames';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useUI } from '@contexts/ui.context';
import { useEffect, useMemo, useState } from 'react';
import Image from '@components/ui/image';
import { useTranslation } from 'next-i18next';
import { FaCheck } from 'react-icons/fa';
import { ICategories } from 'src/types';
import { categoryImageLoader } from '@utils/image-loader';

function checkIsActive(arr: any, item: string) {
  if (arr.includes(item)) {
    return true;
  }
  return false;
}
function CategoryFilterMenuItem({
  className = 'hover:bg-fill-base border-t border-border-base first:border-t-0 px-3.5 2xl:px-4 py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3',
  item,
  depth = 0,
}: {
  item: ICategories;
  className?: string;
  depth?: number;
}) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );
  const isActive =
    checkIsActive(selectedCategories, item.cate_slug) ||
    item?.children?.some((_item: any) =>
      checkIsActive(selectedCategories, _item.cate_slug)
    );
  const [isOpen, setOpen] = useState<boolean>(isActive);
  const [subItemAction, setSubItemAction] = useState<boolean>(false);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);

  const { cate_slug, cate_name_en, children: items, cate_image } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }
  const handleChange = () => {
    setSubItemAction(!subItemAction);
  };

  function onClick() {
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
    } else {
      const { category, ...restQuery } = query;
      let currentFormState = selectedCategories.includes(cate_slug)
        ? selectedCategories.filter((i) => i !== cate_slug)
        : [...selectedCategories, cate_slug];

      console.log(cate_slug, currentFormState);
      router.push(
        {
          pathname,
          query: {
            ...restQuery,
            category: cate_slug,
          },
        },
        undefined,
        { scroll: false }
      );

      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <IoIosArrowDown className="text-base text-brand-dark text-opacity-40" />
    ) : (
      <IoIosArrowUp className="text-base text-brand-dark text-opacity-40" />
    );
  }

  return (
    <>
      <li
        onClick={onClick}
        className={cn(
          'flex justify-between items-center transition text-sm md:text-15px',
          { 'bg-fill-base': isOpen },
          className
        )}
      >
        <button
          className={cn(
            'flex items-center w-full ltr:text-left rtl:text-right cursor-pointer group',
            { 'py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3': depth > 0 }
          )}
          onClick={handleChange}
        >
          {cate_image && (
            <div className="inline-flex shrink-0 2xl:w-12 2xl:h-12 3xl:w-auto 3xl:h-auto ltr:mr-2.5 rtl:ml-2.5 md:ltr:mr-4 md:rtl:ml-4 2xl:ltr:mr-3 2xl:rtl:ml-3 3xl:ltr:mr-4 3xl:rtl:ml-4">
              <Image
                loader={categoryImageLoader}
                src={cate_image ?? '/assets/images/category/fast-food.png'}
                alt={cate_name_en || t('text-category-thumbnail')}
                width={40}
                height={40}
                // style={{ width: 'auto' }}
              />
            </div>
          )}
          <span className="text-brand-dark capitalize py-0.5">
            {cate_name_en}
          </span>
          {depth > 0 && (
            <span
              className={`w-[22px] h-[22px] text-13px flex items-center justify-center border-2 border-border-four rounded-full ltr:ml-auto rtl:mr-auto transition duration-500 ease-in-out group-hover:border-yellow-100 text-brand-light ${
                selectedCategories.includes(cate_slug) &&
                'border-yellow-100 bg-yellow-100'
              }`}
            >
              {selectedCategories.includes(cate_slug) && <FaCheck />}
            </span>
          )}
          {expandIcon && (
            <span className="ltr:ml-auto rtl:mr-auto">{expandIcon}</span>
          )}
        </button>
      </li>
      {Array.isArray(items) && isOpen ? (
        <li>
          <ul key="content" className="px-4 text-xs">
            {items?.map((currentItem: any, index: number) => {
              const childDepth = depth + 1;
              return (
                <CategoryFilterMenuItem
                  key={index}
                  item={currentItem}
                  depth={childDepth}
                  className="px-0 border-t border-border-base first:border-t-0 mx-[3px] bg-transparent"
                />
              );
            })}
          </ul>
        </li>
      ) : null}
    </>
  );
}

function CategoryFilterMenu({
  items,
  className,
}: {
  items: ICategories[];
  className?: string;
}) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <CategoryFilterMenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default CategoryFilterMenu;
