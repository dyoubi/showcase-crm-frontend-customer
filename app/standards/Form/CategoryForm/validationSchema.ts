import * as yup from 'yup';
import { useIntl } from 'react-intl';

import * as t from './types';

// very important to specify the return type as yup.SchemaOf<t.StandardFormType> for prevent typescript problems
export const useFormValidationSchema = (): yup.SchemaOf<t.CategoryForm> => {
  const { formatMessage } = useIntl();

  return yup.object({
    isActive: yup.boolean(),
    name: yup.string().required(
      formatMessage({
        defaultMessage: 'This field is a required',
        id: 'standards.required',
      }),
    ),
    slug: yup.string().required(
      formatMessage({
        defaultMessage: 'This field is a required',
        id: 'standards.required',
      }),
    ),
    birthDate: yup.string().required(
      formatMessage({
        defaultMessage: 'This field is a required',
        id: 'standards.required',
      }),
    ),
  });
};
