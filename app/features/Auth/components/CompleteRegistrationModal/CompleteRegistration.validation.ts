import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { CITY_REGEX, NAME_REGEX, ZIPCODE_REGEX } from '@/core/constants/constants';

import { addYearsToDate } from '@/utils/date';

import { CompleteRegistrationFormType } from './CompleteRegistrationModal.types';

export const useCompleteRegistrationValidation = (): yup.SchemaOf<CompleteRegistrationFormType> => {
  const { formatMessage } = useIntl();

  return yup.object().shape({
    firstname: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'First Name is a required field',
          id: 'completeRegistrationModal.errorFirstNameFieldEmpty',
        }),
      )
      .min(
        2,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be at least {minNumOfCharacters} characters long',
            id: 'completeRegistrationModal.minCharactersLong',
          },
          {
            minNumOfCharacters: 2,
            fieldName: formatMessage({ defaultMessage: 'First Name', id: 'completeRegistrationModal.firstname' }),
          },
        ),
      )
      .max(
        100,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be maximum {maxNumOfCharacters} characters long',
            id: 'completeRegistrationModal.errorMaxCharactersLong',
          },
          {
            maxNumOfCharacters: 100,
            fieldName: formatMessage({ defaultMessage: 'First Name', id: 'completeRegistrationModal.firstname' }),
          },
        ),
      )
      .matches(
        NAME_REGEX,
        formatMessage({
          defaultMessage: 'Special characters are not allowed',
          id: 'completeRegistrationModal.errorNotAllowedCharacters',
        }),
      ),
    lastname: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'Last Name is a required field',
          id: 'completeRegistrationModal.errorLastNameFieldEmpty',
        }),
      )
      .min(
        2,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be at least {minNumOfCharacters} characters long',
            id: 'completeRegistrationModal.minCharactersLong',
          },
          {
            minNumOfCharacters: 2,
            fieldName: formatMessage({ defaultMessage: 'Last Name', id: 'completeRegistrationModal.lastname' }),
          },
        ),
      )
      .max(
        100,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be maximum {maxNumOfCharacters} characters long',
            id: 'completeRegistrationModal.errorMaxCharactersLong',
          },
          {
            maxNumOfCharacters: 100,
            fieldName: formatMessage({ defaultMessage: 'Last Name', id: 'completeRegistrationModal.lastname' }),
          },
        ),
      )
      .matches(
        NAME_REGEX,
        formatMessage({
          defaultMessage: 'Special characters are not allowed',
          id: 'completeRegistrationModal.errorNotAllowedCharacters',
        }),
      ),
    country: yup
      .object()
      .shape({
        value: yup.string().required(
          formatMessage({
            defaultMessage: 'Country is a required field',
            id: 'completeRegistrationModal.errorCountryFieldEmpty',
          }),
        ),
        label: yup.string(),
      })
      .required(),
    city: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'City is a required field',
          id: 'completeRegistrationModal.errorCityFieldEmpty',
        }),
      )
      .min(
        2,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be at least {minNumOfCharacters} characters long',
            id: 'completeRegistrationModal.minCharactersLong',
          },
          {
            minNumOfCharacters: 2,
            fieldName: formatMessage({ defaultMessage: 'City', id: 'completeRegistrationModal.city' }),
          },
        ),
      )
      .max(
        100,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be at least {maxNumOfCharacters} characters long',
            id: 'completeRegistrationModal.errorMaxCharactersLong',
          },
          {
            maxNumOfCharacters: 100,
            fieldName: formatMessage({ defaultMessage: 'City', id: 'completeRegistrationModal.city' }),
          },
        ),
      )
      .matches(
        CITY_REGEX,
        formatMessage({
          defaultMessage: 'Special characters are not allowed',
          id: 'completeRegistrationModal.notAllowedCharacters',
        }),
      ),
    zip: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'ZIP is a required field',
          id: 'completeRegistrationModal.errorZipFieldEmpty',
        }),
      )
      .matches(
        ZIPCODE_REGEX,
        formatMessage({
          defaultMessage: 'Special characters are not allowed',
          id: 'completeRegistrationModal.notAllowedCharacters',
        }),
      )
      .min(
        2,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be at least {minNumOfCharacters} characters long',
            id: 'completeRegistrationModal.minCharactersLong',
          },
          {
            minNumOfCharacters: 2,
            fieldName: formatMessage({ defaultMessage: 'Zip Code', id: 'completeRegistrationModal.zip' }),
          },
        ),
      )
      .max(
        15,
        formatMessage(
          {
            defaultMessage: '{fieldName} must be a maximum of {maxNumOfCharacters} characters long',
            id: 'completeRegistrationModal.errorMaxCharactersLong',
          },
          {
            maxNumOfCharacters: 15,
            fieldName: formatMessage({ defaultMessage: 'Zip Code', id: 'completeRegistrationModal.zip' }),
          },
        ),
      ),
    birthDate: yup
      .string()
      .required(
        formatMessage({
          defaultMessage: 'Field is required',
          id: 'registerForm.errorFieldEmpty',
        }),
      )
      .test({
        test: (v) => {
          if (!v) return false;

          const eighteenYearAgo = addYearsToDate(new Date(), -18);

          return eighteenYearAgo.getTime() >= new Date(v).getTime();
        },
        message: formatMessage({
          defaultMessage: 'You need to be at least 18 years old',
          id: 'registerForm.underageWarning',
        }),
      }),
  });
};
