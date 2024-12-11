import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import { useUpdateUser, useUser } from '@rest/user';
import { useEffect } from 'react';
import { UpdateUserType } from 'src/types';

const defaultValues = {};

const AccountDetails: React.FC = () => {
  const { mutate: updateUser, isLoading: submitLoading } = useUpdateUser();
  const { me, isLoading } = useUser();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<UpdateUserType>({
    defaultValues: {
      firstName: '',
      lastName: '',
      ec_phone: '',
      email: '',
    },
  });
  useEffect(() => {
    if (me) {
      setValue('firstName', me?.ec_name?.split(' ')[0] as string);
      setValue('lastName', me?.ec_name?.split(' ')[1] as string);
      setValue('ec_phone', me?.ec_phone as string);
      setValue('email', me?.ec_email as string);
    }
  }, [isLoading]);
  function onSubmit(input: UpdateUserType) {
    const { ec_phone, ec_image } = input;
    const formData = new FormData();
    formData.append('ec_phone', ec_phone);
    formData.append('ec_image', ec_image[0]);
    updateUser(formData);
  }
  return (
    <div className="flex flex-col w-full">
      <Heading variant="titleLarge" className="mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        {t('common:text-account-details-personal')}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                disabled
                label={t('forms:label-first-name') as string}
                {...register('firstName', {
                  required: 'forms:first-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.firstName?.message}
              />
              <Input
                disabled
                label={t('forms:label-last-name') as string}
                {...register('lastName', {
                  required: 'forms:last-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.lastName?.message}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="tel"
                label={t('forms:label-phone') as string}
                {...register('ec_phone', {
                  required: `${t('forms:phone-required')}`,
                  pattern: {
                    value: /^(?:\+?88|0088)?01[3-9]\d{8}$/,
                    message: t('forms:phone-error'),
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.ec_phone?.message}
              />
              <Input
                type="file"
                label={t('forms:label-photo') as string}
                {...register('ec_image')}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.ec_image?.message}
              />
            </div>
          </div>
        </div>
        <Heading
          variant="titleLarge"
          className="pt-6 mb-5 xl:mb-8 md:pt-7 lg:pt-8"
        >
          {t('common:text-account-details-account')}
        </Heading>
        <div className="pb-7 md:pb-9 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                disabled
                type="email"
                defaultValue={me?.ec_email as string}
                label={t('forms:label-email-star') as string}
                {...register('email', {
                  required: 'forms:email-required',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'forms:email-error',
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.email?.message}
              />
            </div>
          </div>
        </div>
        {/* <div className="relative flex pt-6 md:pt-8 lg:pt-10">
          <div className="ltr:pr-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-share-profile-data')}
            </Heading>
            <Text variant="small">
              {t('common:text-share-profile-data-description')}
            </Text>
          </div>
          <div className="ltr:ml-auto">
            <Controller
              name="shareProfileData"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div> */}
        {/* <div className="relative flex mt-5 mb-1 md:mt-6 lg:mt-7 sm:mb-4 lg:mb-6">
          <div className="ltr:pr-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-ads-performance')}
            </Heading>
            <Text variant="small">
              {t('common:text-ads-performance-description')}
            </Text>
          </div>
          <div className="ltr:ml-auto">
            <Controller
              name="setAdsPerformance"
              control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div>
        </div> */}
        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto lg:pb-0">
          <Button
            type="submit"
            loading={submitLoading}
            disabled={submitLoading}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            {t('common:button-save-changes')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
