import Layout from '@components/layout/layout';
import Heading from '@components/ui/heading';
import { useTranslation } from 'next-i18next';

import Accordion from '@components/ui/accordion';
import { help } from '@settings/help-setting';
import { getLayout } from '@components/layout/layout-five';

export default function HelpCenter() {
  const { t } = useTranslation('common');
  return (
    <>
      <Heading variant="titleLarge">{t('text-account-details-help')}</Heading>
      <div className="flex flex-col pt-6 2xl:pt-8">
        {help?.map((item, index) => (
          <Accordion
            key={`${item.title}-${index}`}
            item={item}
            translatorNS="help"
          />
        ))}
      </div>
    </>
  );
}

HelpCenter.getLayout = getLayout;
