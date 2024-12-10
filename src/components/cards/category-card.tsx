import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { LinkProps } from 'next/link';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { categoryPlaceholder } from '@assets/placeholders';

interface Props {
  item: any;
  href: LinkProps['href'];
  className?: string;
}

const CategoryCard: React.FC<Props> = ({ item, href, className }) => {
  const { t } = useTranslation('common');
  const { name, image } = item ?? {};
  return (
    <Link
      href={href}
      className={cn('group block w-full text-center', className)}
    >
      <div className="flex max-w-[178px] max-h-[178px] mb-3.5 xl:mb-4 mx-auto rounded-full overflow-hidden bg-fill-thumbnail">
        <div
          className={`flex shrink-0 transition-all duration-700 w-full h-full transform scale-50 group-hover:scale-100 -translate-x-full group-hover:translate-x-0
          `}
        >
          <Image
            src={image?.original ?? categoryPlaceholder}
            alt={name || t('text-card-thumbnail')}
            width={178}
            height={178}
            quality={100}
            className="object-cover rounded-full aspect-square"
            priority={false}
          />
        </div>
        <div
          className={`flex shrink-0 transition-all duration-700 w-full h-full transform scale-100 group-hover:scale-50
              -translate-x-full group-hover:translate-x-0
          `}
        >
          <Image
            src={image?.original ?? categoryPlaceholder}
            alt={name || t('text-card-thumbnail')}
            width={178}
            height={178}
            quality={100}
            className="object-cover rounded-full aspect-square"
            priority={false}
          />
        </div>
      </div>
      <h3 className="capitalize text-brand-dark text-sm sm:text-15px lg:text-base truncate">
        {name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
