import type { FC } from 'react';
import { useTranslation } from 'next-i18next';
import ReviewCard from '@components/cards/review-card';
import ReviewForm from '@components/common/form/review-form';
import { IProductReview, ISingleProductType } from 'src/types';
import { useProductReview } from '@rest/review';


const ProductReviewRating = ({ product }: { product: ISingleProductType }) => {
  // const {
  //   query: { slug },
  // } = router;
  const { reviews } = useProductReview(product?.id?.toString() as string)
  const { t } = useTranslation('common');
  return (
    <div className="lg:flex">
      <div className="pt-2 lg:w-3/5">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Ratings & Reviews of {product?.name}</h2>
        {reviews.length > 0 ?
          reviews?.map((item: IProductReview) => (
            <ReviewCard item={item} key={`review-key-${item.id}`} />
          )) : <h2>Review not found</h2>}
      </div>
      {/* <ReviewForm id={product?.id} className="lg:w-2/5 lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-20 3xl:rtl:pr-20 shrink-0 pt-10" /> */}
    </div>
  );
};

export default ProductReviewRating;
