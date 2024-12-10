import { useEffect, useState } from 'react';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/form/text-area';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import cn from 'classnames';
import StarRatingComponent from 'react-star-rating-component';
import StarIcon from '@components/icons/star-icon';
import { useCreateReview } from '@rest/review';
import { useUser } from '@rest/user';
import UnAuthorized from '@utils/unAuthorized';
import CloseButton from '@components/ui/close-button';
import { useModalAction, useModalState } from '../modal/modal.context';

interface ReviewFormProps {
  className?: string;
  id?: number;
}
interface ReviewFormValues {
  comment: string;
  images?: File;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ className = '', id }) => {
  const { openModal, closeModal } = useModalAction();
  const { data } = useModalState();
  const { isAuthorized, me } = useUser();
  const { t } = useTranslation();
  const isUser = !!me.ec_id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  const { isLoading, createReview, isSuccess } = useCreateReview();
  const [rating_custom_icon, set_rating_custom_icon] = useState<Number>(5);
  function onSubmit(values: any) {
    const { comment, images } = values;
    const formDataToSend = new FormData();
    formDataToSend.append('comment', comment);
    formDataToSend.append('order_id', data.order_id);
    formDataToSend.append('rating', rating_custom_icon?.toString());
    formDataToSend.append('product_id', data?.id?.toString());
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formDataToSend.append(`image${i + 1}`, images[i]);
      }
    }
    createReview(formDataToSend);
    reset();
    // for (const [key, value] of formDataToSend.entries()) {
    //   console.log(key, value);
    // }
  }
  console.log(data);
  // useEffect(() => { if (isSuccess) closeModal() }, [isSuccess])
  const onStarClickCustomIcon = (
    nextValue: number,
    prevValue: number,
    name: string
  ) => {
    set_rating_custom_icon(nextValue);
  };

  return (
    <div
      className={
        'md:w-[600px] lg:w-[720px] xl:w-[720px] 2xl:w-[720px] mx-auto p-1 lg:p-2 xl:p-5 bg-brand-light rounded-md'
      }
    >
      <CloseButton onClick={closeModal} />

      <div className="flex mx-auto overflow-hidden rounded-lg"></div>
      <div className={cn(className)}>
        {/* {!isAuthorized && !isUser ? <UnAuthorized />
        :
        <> */}
        <Heading className="mb-2">Write your review</Heading>
        <Text>
          Your email address will not be published. Required fields are marked*
        </Text>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center w-full mx-auto mt-5 lg:mt-7 xl:mt-9"
          noValidate
        >
          <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
            <div className="pb-1.5 flex items-center">
              <label className="block text-sm leading-none cursor-pointer shrink-0 text-brand-dark md:text-15px ltr:pr-3">
                {t('forms:label-your-rating')}
              </label>
              {/* @ts-ignore */}
              <StarRatingComponent
                name="rating"
                starCount={5}
                value={Number(rating_custom_icon)}
                onStarClick={onStarClickCustomIcon}
                starColor="#F3B81F"
                emptyStarColor="#DFE6ED"
                renderStarIcon={() => (
                  <StarIcon className="w-3.5 lg:w-4 h-3.5 lg:h-4" />
                )}
              />
            </div>
            <Input
              label={t('forms:label-name-star') as string}
              {...register('images')}
              variant="solid"
              type="file"
              multiple
            />
            <TextArea
              variant="solid"
              label="forms:label-message-star"
              {...register('comment', { required: 'Comment is required' })}
              error={errors.comment?.message}
            />
            <div className="pt-1">
              <Button
                loading={isLoading}
                disabled={isLoading}
                type="submit"
                className="w-full h-12 text-sm md:mt-1 lg:text-base sm:w-auto"
              >
                {t('common:button-submit')}
              </Button>
            </div>
          </div>
        </form>
        {/* </>} */}
      </div>
    </div>
  );
};

export default ReviewForm;
