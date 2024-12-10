import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import TextArea from '@components/ui/form/text-area';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import cn from 'classnames';
import { useCreateQuestion } from '@rest/question';
import { ICreateQuestionType } from 'src/types';
import { useUser } from '@rest/user';
import { useEffect, useState } from 'react';
import UnAuthorized from '@utils/unAuthorized';

interface ReviewFormProps {
  className?: string;
  id: number
}
interface ReviewFormValues {
  question: string;
}

const QuestionForm: React.FC<ReviewFormProps> = ({ className = '', id }) => {
  const { isAuthorized, me } = useUser();
  const { createQuestion, isLoading } = useCreateQuestion()
  const { t } = useTranslation();
  const isUser = !!me.ec_id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>();
  function onSubmit(values: ReviewFormValues) {
    const { question } = values
    const body: ICreateQuestionType = {
      question: question,
      product_id: id
    }
    createQuestion(body)
    reset()
  }

  return (
    <div className={cn(className)}>
      {!isAuthorized && !isUser ? <UnAuthorized />
        :
        <>
          <Heading className="mb-2">Write your question</Heading>
          <Text>
            Your email address will not be published. Required fields are marked*
          </Text>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center w-full mx-auto mt-5 lg:mt-7 xl:mt-9"
            noValidate
          >
            <div className="flex flex-col space-y-5 md:space-y-6 lg:space-y-7">
              <TextArea
                variant="solid"
                label="forms:label-question-star"
                {...register('question', { required: 'Question is required' })}
                error={errors.question?.message}
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
        </>
      }
    </div>
  );
};

export default QuestionForm;
