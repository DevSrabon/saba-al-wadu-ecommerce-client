import Image from '@components/ui/image';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
const data = {
  title: 'app-heading',
  description: 'app-description',
  appImage: '/assets/images/app-thumbnail.webp',
  appButtons: [
    {
      id: 1,
      slug: 'https://play.google.com/store/apps/details?id=com.m360ict.me_mart',
      altText: 'button-play-store',
      appButton: '/assets/images/play-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
  ],
};

interface Props {
  className?: string;
}

const DownloadApps: React.FC<Props> = ({ className = 'pt-1.5 md:pt-0' }) => {
  const { appButtons, title, description, appImage } = data;
  const { t } = useTranslation('common');
  return (
    <div className={cn('bg-fill-two overflow-hidden', className)}>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-5 md:px-6 lg:px-16 xl:px-28 2xl:px-32 3xl:px-40 md:flex justify-between items-center">
        <div className="shrink-0 mx-auto md:ltr:ml-0 lg:flex lg:items-center pb-5 pt-1.5 md:pt-4 max-w-[350px] md:max-w-[340px] lg:max-w-[485px] xl:max-w-[540px] 2xl:max-w-[680px] 3xl:ltr:pl-10">
          <div className="py-8 text-center xl:py-10 2xl:py-14 md:ltr:text-left">
            <h2 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-brand-dark font-bold font-manrope -tracking-[0.2px] mb-3 lg:mb-4">
              {t(title)}
            </h2>
            <p className="text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-brand-dark text-opacity-70 pb-5 lg:pb-7 ltr:pr-0 xl:ltr:pr-8 2xl:ltr:pr-20">
              {t(description)}
            </p>
            <div className="flex justify-center md:justify-start -mx-1 md:-mx-1.5 pt-0.5 px-7 sm:px-0">
              {appButtons?.map((item) => (
                <a
                  key={item.id}
                  href={item.slug}
                  className="inline-flex transition duration-200 ease-in hover:box-shadow hover:opacity-80 mx-1 md:mx-1.5"
                  rel="referrer"
                  target="_blank"
                >
                  <Image
                    src={item.appButton}
                    alt={t(item.altText)}
                    className="rounded-md w-36 lg:w-44"
                    width={item.buttonWidth}
                    height={item.buttonHeight}
                    // style={{ width: 'auto' }}
                    priority
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-end ltr:pl-4 2xl:ltr:pl-0 md:max-w-[480px] lg:max-w-[540px] xl:max-w-auto ltr:-mr-16 lg:ltr:-mr-8 3xl:ltr:mr-24">
          <Image
            src={appImage}
            alt={t('text-app-thumbnail')}
            width={597}
            height={500}
            // style={{ width: 'auto' }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadApps;