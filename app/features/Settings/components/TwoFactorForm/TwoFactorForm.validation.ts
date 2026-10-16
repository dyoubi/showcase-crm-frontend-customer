import * as yup from 'yup';

import { TwoFactorFormData } from './TwoFactorForm.types';

export const useTwoFactorValidation = (): yup.SchemaOf<TwoFactorFormData> =>
  yup.object().shape({
    password: yup.string().min(8).required(),
    code: yup.string().required(),
  });
