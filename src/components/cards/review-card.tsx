import { useState, type FC } from 'react';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import StarIcon from '@components/icons/star-icon';
import { IProductReview } from 'src/types';
import { CreatedAt } from '@utils/date-piker';
import Flickity from 'react-flickity-component';
import Image from 'next/image';
import { productImageLoader, reviewImageLoader } from '@utils/image-loader';

interface ReviewProps {
  item: IProductReview;
  className?: string;
}

const ReviewCard: FC<ReviewProps> = ({ item, className = '' }) => {
  const { t } = useTranslation('common');
  const [menu, setMenu] = useState(true);
  const [menu1, setMenu1] = useState(false);

  return (
    <div
      className={`border-b border-border-base last:border-0 pb-6 mb-6 last:mb-0 ${className}`}
    >
      <div className="flex -mx-0.5 mb-3.5">
        {[...Array(5)].map((_, idx) => (
          <StarIcon
            key={idx}
            color={idx < item.rating ? '#F3B81F' : '#DFE6ED'}
            className="w-3.5 lg:w-4 h-3.5 lg:h-4 mx-0.5"
          />
        ))}
      </div>
      <Heading className="mb-1.5">{item.customer_name}</Heading>
      <div className="text-sm text-brand-dark text-opacity-80">
        {/* {t('text-by')} */}
        <span className="inline-block ltr:ml-[3px] font-semibold">
          <CreatedAt createdAt={item.created_at} />
        </span>
      </div>
      <Text className="xl:leading-[2em]">{item.comment}</Text>
      <div className="hidden md:flex flex-row mt-2 justify-start items-start space-x-4 w-full ">
        {item?.review_images?.map((image) => (
          <Image
            key={image.image_id}
            loader={reviewImageLoader}
            src={image?.image_name ?? '/assets/placeholder/cart-item.svg'}
            alt={image?.image_name || 'Product Image'}
            height={120}
            width={120}
            priority
            className="w-75 h-75 object-contain bg-fill-thumbnail"
            loading="eager"
            placeholder="empty"
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
