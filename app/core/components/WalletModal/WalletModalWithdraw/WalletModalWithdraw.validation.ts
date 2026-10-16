import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { EstimatedFees } from '@/core/domains/wallet';

import { WithdrawModalForm } from './WalletModalWithdraw.types';

const AddressRegex = /^[a-zA-Z0-9]{25,56}$/;

type UseWalWithdrawValidationProps = {
  maxAmount: number;
  minWithdrawal: EstimatedFees['minWithdrawal'];
  currency: EstimatedFees['currency'];
};

export const useWalletWithdrawValidation = (props: UseWalWithdrawValidationProps): yup.SchemaOf<WithdrawModalForm> => {
  const { maxAmount, minWithdrawal, currency } = props;

  const { formatMessage } = useIntl();

  return yup
    .object()
    .shape({
      currency: yup.string().required(
        formatMessage({
          defaultMessage: 'This field is required',
          id: 'validation.isRequired',
        }),
      ),
      address: yup
        .string()
        .matches(AddressRegex, {
          message: formatMessage({
            defaultMessage: 'Invalid address',
            id: 'walletWithdraw.errorAddressFieldInvalid',
          }),
          excludeEmptyString: true,
        })
        .required(
          formatMessage({
            defaultMessage: 'This field is required',
            id: 'validation.isRequired',
          }),
        ),
      amount: yup
        .number()
        .min(
          Number(minWithdrawal),
          formatMessage(
            {
              defaultMessage: 'Minimum withdrawal: {minWithdrawal} {currency}',
              id: 'walletWithdraw.errorAmountFieldMinAmount',
            },
            {
              minWithdrawal,
              currency,
            },
          ),
        )
        .required(
          formatMessage({
            defaultMessage: 'This field is required',
            id: 'validation.isRequired',
          }),
        )
        .max(
          maxAmount,
          formatMessage(
            {
              defaultMessage: 'Maximum withdrawal: {maxAmount} {currency}',
              id: 'walletWithdraw.errorAmountFieldMaxAmount',
            },
            {
              maxAmount,
              currency,
            },
          ),
        ),
    })
    .required();
};
