import { useModalAction } from '@components/common/modal/modal.context';
import Heading from '@components/ui/heading';
import React from 'react'
import { useTranslation } from 'react-i18next';

function UnAuthorized() {
  const { openModal } = useModalAction();
  const { t } = useTranslation();
  function handleSignUp() {
    return openModal('SIGN_UP_VIEW');
  }
  function handleSignIn() {
    return openModal('LOGIN_VIEW');
  }
  return (
    <>
      <Heading className="mb-2 text-center">Ask questions before login your account</Heading>
      <div className=" mb-1 mt-5 text-sm text-center sm:text-15px text-body">
        {t('common:text-already-registered')}
        <button
          type="button"
          className="text-sm font-semibold mb-1 ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t('common:text-sign-in-now')}
        </button>
        <br />
        {t('common:text-don’t-have-account')}
        <button
          type="button"
          className="text-sm font-semibold text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
          onClick={handleSignUp}
        >
          {t('common:text-create-account')}
        </button>

      </div>
    </>
  )
}

export default UnAuthorized