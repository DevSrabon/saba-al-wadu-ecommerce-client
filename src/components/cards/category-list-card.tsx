import Link, { LinkProps } from 'next/link';
import Image from '@components/ui/image';
import { IoIosArrowForward } from 'react-icons/io';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { ICategories } from 'src/types';
import { categoryImageLoader } from '@utils/image-loader';

interface Props {
  category: ICategories;
  href: LinkProps['href'];
  className?: string;
}

const CategoryListCard: React.FC<Props> = ({ category, className, href }) => {
  const { cate_name_en, cate_image } = category;
  const { t } = useTranslation('common');
  return (
    <Link href={href} legacyBehavior>
      <a
        className={cn(
          'group flex transition py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3 justify-between items-center px-3.5 2xl:px-4',
          className
        )}
      >
        <div className={`${'flex items-center'}`}>
          <div className={cn('2xl:w-12 3xl:w-auto 2xl:h-12 3xl:h-auto')}>
            <Image
              loader={categoryImageLoader}
              src={cate_image ?? '/assets/placeholder/category-small.svg'}
              alt={cate_name_en || t('text-category-thumbnail')}
              width={40}
              height={40}
              className="aspect-square"
            />
          </div>
          <h3
            className={`text-15px text-brand-dark capitalize ${'ltr:pl-2.5 md:ltr:pl-4 2xl:ltr:pl-3 3xl:ltr:pl-4'}`}
          >
            {cate_name_en}
          </h3>
        </div>
        <div className="flex items-center transition-all transform group-hover:translate-x-1">
          <IoIosArrowForward className="text-base text-brand-dark text-opacity-40" />
        </div>
      </a>
    </Link>
  );
};

export default CategoryListCard;
