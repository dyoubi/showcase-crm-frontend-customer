import * as yup from 'yup';
import { useIntl } from 'react-intl';
import { useSession } from 'next-auth/react';

import { FiatCodes } from '@/core/domains/currency';

import { BetLimitFormData, Period, SelfExclusionFormData } from './Account.types';

export const useBetLimitValidation = (): yup.SchemaOf<BetLimitFormData> => {
  const { formatMessage } = useIntl();

  return yup.object().shape({
    currency: yup.mixed<FiatCodes>(), // Ensure the values match the options
    limitPeriod: yup.mixed<Period>(),
    limit: yup
      .string()
      .matches(/^[\d,]*(\.\d+)?$/, {
        message: formatMessage({
          defaultMessage: 'Amount must only contain numbers, dots, or commas',
          id: 'walletWithdraw.errorAmountFormat',
        }),
      })
      .test(
        'isValidNumber',
        formatMessage({
          defaultMessage: 'Amount must be a valid number',
          id: 'walletWithdraw.errorValidNumber',
        }),
        (value) => {
          if (!value || value === '') return false;

          return !/[,.]{2,}/.test(value) && (value.indexOf(',') === -1 || value.indexOf('.') === -1);
        },
      )
      .required(
        formatMessage({
          defaultMessage: 'Amount is a required field',
          id: 'walletWithdraw.errorAmountField',
        }),
      ),
  }) as yup.SchemaOf<BetLimitFormData>;
};
export const useSelfExclusionValidation = (): yup.SchemaOf<SelfExclusionFormData> => {
  const { formatMessage } = useIntl();
  const { data: session } = useSession();

  return yup.object().shape({
    username: yup.string().test(
      'isValidNumber',
      formatMessage({
        defaultMessage: 'Username must match the current one',
        id: 'account.selfExclusion.error.username',
      }),
      (value) => {
        if (!value || !session?.player?.nickname) return false;

        if (session.player.nickname.toLowerCase() !== value.toLowerCase()) return false;

        return true;
      },
    ),
  }) as yup.SchemaOf<SelfExclusionFormData>;
};
