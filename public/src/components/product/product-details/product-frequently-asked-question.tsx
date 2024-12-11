import { useTranslation } from 'next-i18next';
import { IProductFAQType } from 'src/types';
import FrequentlyAskedCard from '@components/cards/frequently-asked-card';
import QuestionForm from '@components/common/form/question-form';
import { useProductQuestion } from '@rest/question';


const ProductFrequentlyAskedQuestion = ({ id }: { id: number }) => {
  const { questions } = useProductQuestion(id?.toString() as string)
  const { t } = useTranslation('common');
  return (
    <div className="lg:flex">
      <div className="pt-2 lg:w-3/5">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Frequently asked questions</h2>
        {questions.length > 0 ?
          questions?.map((item: IProductFAQType) => (
            <FrequentlyAskedCard item={item} key={`review-key-${item.id}`} />
          )) : <h2>No Frequently asked questions</h2>}
      </div>
      <QuestionForm id={id} className="lg:w-2/5 lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-20 3xl:rtl:pr-20 shrink-0 pt-10" />
    </div>
  );
};

export default ProductFrequentlyAskedQuestion;
