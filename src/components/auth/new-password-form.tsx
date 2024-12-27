import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import Logo from '@components/ui/logo';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import FormAlert from '@components/ui/form-alert';
import { useNewPassword } from '@rest/user';
import PasswordInput from '@components/ui/form/password-input';

type FormValues = {
  password: string;
};

const defaultValues = {
  password: '',
};

const NewPasswordForm = () => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const { data } = useModalState();
  const {
    isLoading,
    mutate: createNewPassword,
    serverError,
    setServerError,
  } = useNewPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }

  const onSubmit = (values: FormValues) => {
    const body = {
      token: data,
      password: values.password,
    };
    createNewPassword(body);
  };

  return (
    <div className="w-full px-5 py-6 mx-auto rounded-lg sm:p-8 bg-brand-light sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="mt-3 mb-8 text-sm md:text-base text-body sm:mt-4 sm:mb-10">
          {t('common:submit-password-helper')}
        </p>
      </div>
      <FormAlert
        variant="error"
        message={serverError && t(serverError)}
        className="mb-6"
        closeable={true}
        onClose={() => setServerError(null)}
      />
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="flex flex-col justify-center"
        noValidate
      >
        <PasswordInput
          className="mb-4"
          label={t('forms:label-password') as string}
          error={errors.password?.message}
          {...register('password', {
            required: `${t('forms:password-required')}`,
          })}
        />
        <Button
          loading={isLoading}
          disabled={isLoading}
          type="submit"
          variant="formButton"
          className="w-full mt-0 h-11 md:h-12"
        >
          {t('common:text-reset-password')}
        </Button>
      </form>
      <div className="relative flex flex-col items-center justify-center mt-8 mb-6 text-sm text-heading sm:mt-10 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-brand-light">
          {t('common:text-or')}
        </span>
      </div>
      <div className="text-sm text-center sm:text-15px text-brand-muted">
        {t('common:text-back-to')}{' '}
        <button
          type="button"
          className="font-medium underline text-brand-dark hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t('common:text-login')}
        </button>
      </div>
    </div>
  );
};

export default NewPasswordForm;
