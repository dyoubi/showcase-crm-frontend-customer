import { FormattedMessage, useIntl } from 'react-intl';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Modal } from '@/core/shared/Modal';
import { Box } from '@/core/shared/Box';
import { Input } from '@/core/shared/Input';
import { Text } from '@/core/components/Typography/Text';
import { Button } from '@/core/shared/Button';
import { Select } from '@/core/shared/Select';
import { SelectSize } from '@/core/shared/Select/Select.types';
import { DateInputRHF } from '@/core/components/RHF/DateInputRHF';
import { useAppDispatch } from '@/core/store/store';
import { setIsIncompleteProfileModalOpen } from '@/core/store/metaSlice';
import { useGetPlayerQuery, usePatchPlayerMutation } from '@/core/domains/player';

import { AddressRow, ButtonRow, FormRow } from './CompleteRegistrationModal.styles';
import {
  CompleteRegistrationFormType,
  CompleteRegistrationModalProps,
  UpdateUserRequest,
} from './CompleteRegistrationModal.types';
import { useCompleteRegistrationValidation } from './CompleteRegistration.validation';
import { useGetCountriesList } from './hooks';

import { getControlledInputProps } from '@/libs/react-hook-form/utils';

export const CompleteRegistrationModal = ({ isOpen, setIsOpen, isSubmitted }: CompleteRegistrationModalProps) => {
  // hooks
  const { formatMessage } = useIntl();
  const dispatch = useAppDispatch();
  const [updateUser] = usePatchPlayerMutation();
  const { data, refetch } = useGetPlayerQuery(undefined);

  const form = useForm<CompleteRegistrationFormType>({
    mode: 'onChange',
    resolver: yupResolver(useCompleteRegistrationValidation()),
    defaultValues: {
      birthDate: data?.birthdate?.toString(),
    },
  });

  const countries = useGetCountriesList();

  // constants
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = form;

  const onSubmit = async (formData: CompleteRegistrationFormType) => {
    const { firstname, lastname, city, country, zip } = formData;

    const requestData: UpdateUserRequest = {
      firstname: firstname?.trim(),
      lastname: lastname?.trim(),
      address: {
        city: city?.trim(),
        country: country?.value?.toUpperCase(),
        postalCode: zip?.trim(),
      },
      gender: 'm',
    } as const;

    await updateUser(requestData);
    await refetch();

    dispatch(setIsIncompleteProfileModalOpen(false));

    if (isSubmitted) isSubmitted();
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={formatMessage({
        defaultMessage: 'Please confirm your identity to access games',
        id: 'completeRegistrationModal.header',
      })}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Box mb="s" mr="xxs" width="50%">
            <Input
              {...register('firstname')}
              error={errors.firstname?.message}
              name="firstname"
              placeholder={formatMessage({
                defaultMessage: 'First Name',
                id: 'completeRegistrationModal.firstname',
              })}
            />
          </Box>
          <Box mb="s" ml="xxs" width="50%">
            <Input
              {...register('lastname')}
              error={errors.lastname?.message}
              name="lastname"
              placeholder={formatMessage({
                defaultMessage: 'Last Name',
                id: 'completeRegistrationModal.lastname',
              })}
            />
          </Box>
        </FormRow>
        <Box mb="s">
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select
                error={errors.country?.value?.message}
                size={SelectSize.Big}
                {...field}
                // @ts-expect-error: ref null is needed here
                ref={null}
                placeholder={formatMessage({
                  defaultMessage: 'Country',
                  id: 'completeRegistrationModal.country',
                })}
                options={countries}
              />
            )}
          />
        </Box>
        <AddressRow>
          <Box mb="s" mr="xxs">
            <Input
              {...register('city')}
              error={errors.city?.message}
              name="city"
              placeholder={formatMessage({
                defaultMessage: 'City',
                id: 'completeRegistrationModal.city',
              })}
            />
          </Box>
          <Box mb="s" ml="xxs">
            <Input
              {...register('zip')}
              error={errors.zip?.message}
              name="zip"
              placeholder={formatMessage({
                defaultMessage: 'ZIP',
                id: 'completeRegistrationModal.zip',
              })}
            />
          </Box>
        </AddressRow>
        <DateInputRHF
          label={
            <Text level="medium">
              <FormattedMessage id="registerForm.dobText" defaultMessage="Date of Birth" />
            </Text>
          }
          disabled
          readOnly
          {...getControlledInputProps(form, 'birthDate')}
          defaultValue={data?.birthdate?.toString()}
        />
        <ButtonRow>
          <Button disabled={!isValid || isSubmitting} isLoading={isSubmitting} type="submit">
            <FormattedMessage id="completeRegistrationModal.submitButtonLabel" defaultMessage="Confirm" />
          </Button>
        </ButtonRow>
      </form>
    </Modal>
  );
};
