import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { useChangePassword } from '@rest/user';
import { IChangePasswordInputType } from 'src/types';
import Alert from '@components/ui/alert';
import FormAlert from '@components/ui/form-alert';

const defaultValues = {
  old_password: '',
  new_password: '',
};

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const {
    mutate: changePassword,
    isLoading,
    serverError,
    setServerError,
  } = useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePasswordInputType>({
    defaultValues,
  });
  function onSubmit(input: IChangePasswordInputType) {
    changePassword(input);
  }
  return (
    <>
      <Heading variant="titleLarge">
        {t('common:text-account-details-password')}
      </Heading>
      <div className="w-full flex  h-full lg:w-10/12 2xl:w-9/12 flex-col mt-6 lg:mt-7">
        <FormAlert
          variant="error"
          message={serverError && t(serverError)}
          className="mb-6"
          closeable={true}
          onClose={() => setServerError(null)}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full mx-auto flex flex-col justify-center "
        >
          <div className="flex flex-col space-y-5 lg:space-y-7">
            <PasswordInput
              label={t('forms:label-old-password')}
              error={errors.old_password?.message}
              {...register('old_password', {
                required: `${t('forms:password-old-required')}`,
              })}
            />
            <PasswordInput
              label={t('forms:label-new-password')}
              error={errors.new_password?.message}
              {...register('new_password', {
                required: `${t('forms:password-new-required')}`,
                minLength: {
                  value: 8,
                  message: 'Minimum password length is 8 characters',
                },
              })}
            />

            <div className="relative mt-3">
              <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                variant="formButton"
                className="w-full sm:w-auto"
              >
                {t('common:text-change-password')}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
