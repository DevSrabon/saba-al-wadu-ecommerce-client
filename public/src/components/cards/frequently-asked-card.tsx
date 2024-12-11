import { type FC } from 'react';
import { useTranslation } from 'next-i18next';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import { IProductFAQType } from 'src/types';
import { CreatedAt, DateResponseTime } from '@utils/date-piker';

import QuestionIcon from '@components/icons/qusetion-icon';
import { TypographyBlockquote } from '@components/common/blockquote';


interface ReviewProps {
  item: IProductFAQType;
  className?: string;
}

const FrequentlyAskedCard: FC<ReviewProps> = ({ item, className = '' }) => {
  const { t } = useTranslation('common');

  return (

    <div
      className={`border-b border-border-base last:border-0 pb-6 mb-6 last:mb-0 ${className}`}
    >
      <Heading className="mb-1.5 flex items-center"><QuestionIcon /> {item.question}</Heading>
      <div className=" text-sm text-brand-dark text-opacity-80 flex items-center">
        {/* {t('text-by')} */}
        <Text className="xl:leading-[2em] "> {item.customer_name} {' '} - </Text>
        {/* <Text className="xl:leading-[2em]"> Question </Text> */}
        <span className="ltr:ml-[3px] font-semibold">
          <CreatedAt createdAt={item.question_date} />
        </span>
      </div>
      <TypographyBlockquote key={item?.id} children={item?.answer!} />
      {/* <Text className="xl:leading-[2em]">{item?.answer}</Text> */}
      {item.answer_date &&
        <div className="text-sm text-brand-dark text-opacity-80 flex items-center">
          <Text className="xl:leading-[2em]"> {"answered within"} {' '} - </Text>
          <span className="ltr:ml-[3px] font-semibold">
            <DateResponseTime start={item.answer_date} end={item.question_date} />
          </span>
        </div>
      }
    </div>

  )
}

export default FrequentlyAskedCard;
