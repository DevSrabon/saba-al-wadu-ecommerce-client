import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalState } from '@components/common/modal/modal.context';
import { useModalAction } from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import Map from '@components/ui/map';
import { useTranslation } from 'next-i18next';
import Select from '@components/ui/form/select-input';
import { useEffect, useState } from 'react';
import {
  useAddAddress,
  useArea,
  useCities,
  useProvince,
  useSubCities,
  useUpdateAddress,
} from '@rest/address';
import SelectProvince from '@components/ui/form/select-province';
import SelectCities from '@components/ui/form/select-cities';
import SelectSubCities from '@components/ui/form/select-sub-cities';
import SelectArea from '@components/ui/form/select-area';
import { IAddAddress } from 'src/types';

interface IState {
  province: string;
  city: string;
  subCity: string;
  area: string;
}

const AddAddressForm: React.FC = () => {
  const { t } = useTranslation();
  const { data } = useModalState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddAddress>({
    defaultValues: {
      name: data || data?.name ? data?.name : '',
      phone: data || data?.phone ? data?.phone : '',
      label: data || data?.label ? data?.label : '',
      landmark: data || data?.landmark ? data?.landmark : '',
      address: data || data?.address ? data?.address : '',
    },
  });
  const [state, setState] = useState<IState>({
    province: '',
    city: '',
    subCity: '',
    area: '',
  });
  const { error, isLoading, province } = useProvince();
  const { cities, isLoading: citiesLoading } = useCities(state.province);
  const { subCities, isLoading: subCitiesLoading } = useSubCities(state.city);
  const { area, isLoading: areaLoading } = useArea(state.subCity);
  const {
    mutate: createAddress,
    isLoading: submitLoading,
    formError,
  } = useAddAddress();
  const { mutate: updateAddress, isLoading: updateLoading } =
    useUpdateAddress();

  const { closeModal } = useModalAction();

  // useEffect(() => {
  //   if (data) {
  //     setState({
  //       province: data.province_id,
  //       city: data.city_id,
  //       subCity: data.sub_city_id,
  //       area: data.area_id,
  //     });
  //   }
  // }, [data]);

  function onSubmit(values: IAddAddress) {
    if ('id' in data && data.id !== undefined) {
      // Filter out empty fields
      const updatedValue = (
        Object.keys(values) as (keyof typeof values)[]
      ).reduce((acc, key) => {
        const value = values[key];
        if (value !== '') {
          acc['ecsa_' + key] = value;
        }
        return acc;
      }, {} as any);
      updateAddress({ id: data.id, address: updatedValue });
    } else {
      // Filter out empty fields
      const getValue = (Object.keys(values) as (keyof typeof values)[]).reduce(
        (acc, key) => {
          const value = values[key];
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {} as any
      );
      createAddress(getValue);
    }
  }

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-add-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col md:flex-row mb-1">
          <div className="mb-6 mr-6 w-full">
            <Input
              variant="solid"
              label="Recipient's Full Name"
              placeholder="john doe"
              {...register('name', {
                required: 'Recipient full name required',
              })}
              error={errors.name?.message}
            />
          </div>
          <div className="mb-6 ml-1 w-full">
            <Input
              type="number"
              variant="solid"
              label="Recipient's phone number"
              placeholder="016********"
              {...register('phone', {
                required: `${t('forms:phone-required')}`,
                pattern: {
                  value: /^(?:\+?88|0088)?01[3-9]\d{8}$/,
                  message: t('forms:phone-error'),
                },
              })}
              error={errors.phone?.message}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-1">
          <div className="mb-6 mr-6 w-full">
            <Input
              variant="solid"
              label="Label type (optional)"
              placeholder="Home or Work"
              {...register('label')}
              error={errors.landmark?.message}
            />
          </div>
          <div className="mb-6 ml-1 w-full">
            <Input
              variant="solid"
              label="Shipping landmark (optional)"
              placeholder="Write exact place name to find your location"
              {...register('landmark')}
              error={errors.landmark?.message}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-1">
          <div className="mb-6 mr-6 w-full">
            <SelectProvince
              variant="solid"
              name="province"
              isLoading={isLoading}
              value={state.province}
              options={province}
              label="Select province"
              // {...register('province', { required: 'Province is required' })}

              // error={errors.province?.message}
              onChange={(e) => setState({ ...state, province: e.target.value })}
            />
          </div>
          <div className="mb-6 ml-1 w-full">
            <SelectCities
              variant="solid"
              isLoading={citiesLoading}
              value={state.city}
              options={cities}
              label="Select city"
              name="city"
              // {...register('city', { required: 'City is required' })}
              // error={errors.city?.message}
              onChange={(e) => setState({ ...state, city: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mb-1">
          <div className="mb-6 mr-6 w-full">
            <SelectSubCities
              variant="solid"
              isLoading={subCitiesLoading}
              value={state.subCity}
              options={subCities}
              label="Select sub-city"
              name="suc_city"
              // {...register('sub_city', { required: 'Sub-city required' })}
              // error={errors.sub_city?.message}
              onChange={(e) => setState({ ...state, subCity: e.target.value })}
            />
          </div>
          <div className="mb-6 ml-1 w-full">
            <SelectArea
              name="ar_id"
              variant="solid"
              isLoading={areaLoading}
              value={state.area}
              options={area}
              label="Select area"
              register={register('ar_id', { required: 'Area is required' })}
              // {...register('are_id', { required: 'Area is required' })}
              error={errors.ar_id?.message}
              // onChange={(e) => setState({ ...state, area: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 mb-6 gap-7">
          {/* <Map
            lat={data?.address?.lat || 1.295831}
            lng={data?.address?.lng || 103.76261}
            height={'420px'}
            zoom={15}
            showInfoWindow={false}
            mapCurrentPosition={(value: string) =>
              setValue('formatted_address', value)
            }
          /> */}
          <TextArea
            label="Shipping address"
            placeholder="Write your shipping address"
            {...register('address', {
              required: 'forms:address-required',
            })}
            error={errors.address?.message}
            className="text-brand-dark"
            variant="solid"
          />
        </div>
        <div className="flex justify-end w-full">
          {/* <Button variant="formButton"
            loading={submitLoading} disabled={submitLoading} className="h-11 md:h-12 mt-1.5" type="submit">
            {t('common:text-save-address')}
          </Button> */}
          <Button
            type="submit"
            loading={submitLoading || updateLoading}
            disabled={submitLoading || updateLoading}
            className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
            variant="formButton"
          >
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressForm;
