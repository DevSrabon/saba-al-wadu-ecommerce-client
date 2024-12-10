import cn from 'classnames';
import React, { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import { IGetAllProvince } from 'src/types';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  options: IGetAllProvince[],
  inputClassName?: string;
  labelClassName?: string;
  label?: string;
  placeholder?: string;
  name: string;
  error?: string;
  type?: string;
  value: string;
  shadow?: boolean;
  isLoading: boolean;
  variant?: 'normal' | 'solid' | 'outline';
}
const classes = {
  root: 'py-2 px-4 w-full appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-brand-dark focus:ring-0',
  normal:
    'bg-gray-100 border-gray-300 focus:shadow focus:text-brand-light focus:border-brand',
  solid:
    'text-brand-dark font-bold border-border-two focus:border-2 focus:outline-none focus:border-brand h-11 md:h-12',
  outline: 'border-gray-300 focus:border-brand',
  shadow: 'focus:shadow',
};
const SelectProvince: React.FC<Props> = (
  (
    {
      className = 'block',
      label,
      name,
      isLoading,
      options,
      error,
      placeholder,
      variant = 'normal',
      shadow = false,
      type = 'text',
      inputClassName,
      labelClassName,
      value,
      ...rest
    },
  ) => {
    const rootClassName = cn(
      classes.root,
      {
        [classes.normal]: variant === 'normal',
        [classes.solid]: variant === 'solid',
        [classes.outline]: variant === 'outline',
      },
      {
        [classes.shadow]: shadow,
      },
      inputClassName
    );
    const { t } = useTranslation();
    let notFound: ReactNode = null
    if (options.length === 0) {
      notFound = <option value="" className='font-medium'>Not found</option>
    }
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className={`block font-normal text-sm leading-none mb-3 cursor-pointer ${labelClassName || 'text-brand-dark text-opacity-70'
              }`}
          >
            {t(label)}
          </label>
        )}
        <select
          id={name}
          name={name}
          // ref={ref}
          // @ts-ignore
          placeholder={t(placeholder)}
          // value={value}
          defaultValue={"default"}
          className={rootClassName}
          autoComplete="off"
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        >
          {notFound}
          {!isLoading ? <>
            <option value="default" className='font-medium' disabled selected>Select your province</option>
            {options?.map((item: IGetAllProvince, index: number) => (
              <option key={index} className={`${value === item.pro_id.toString() ? 'font-bold' : 'font-normal'
                } block truncate`} value={item.pro_id} >{item.pro_name_en}</option>
            ))}
          </> : <option value="" className='font-medium'>Loading...</option>}
        </select>
        {error && (
          <p className="my-2 text-13px text-brand-danger text-opacity-70">
            {t(error)}
          </p>
        )}
      </div>
    );
  }
);

SelectProvince.displayName = 'SelectProvince';
export default SelectProvince;
