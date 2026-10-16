import { useIntl } from 'react-intl';
import * as yup from 'yup';

import { ChangellyDepositForm } from './WalletModalBuy.types';

type UseWalChangelyDepositValidationProps = {
  providerCode: string;
  currencyFrom: 'USD' | 'EUR';
  currencyTo: 'BTC' | 'ETH' | 'TRX';
  amountFrom: number;
  termsAccepted: boolean;
};

export const useWalletBuyValidation = (
  props: UseWalChangelyDepositValidationProps,
): yup.SchemaOf<ChangellyDepositForm> => {
  const { currencyFrom, amountFrom } = props;

  const { formatMessage } = useIntl();

  return yup
    .object()
    .shape({
      providerCode: yup.string().required(
        formatMessage({
          defaultMessage: 'Please select a payment provider',
          id: 'walletBuy.errorProviderRequired',
        }),
      ),
      currencyFrom: yup.string().required(
        formatMessage({
          defaultMessage: 'This field is required',
          id: 'validation.isRequired',
        }),
      ),
      currencyTo: yup.string().required(
        formatMessage({
          defaultMessage: 'This field is required',
          id: 'validation.isRequired',
        }),
      ),
      amountFrom: yup
        .string()
        .required(
          formatMessage({
            defaultMessage: 'This field is required',
            id: 'validation.isRequired',
          }),
        )
        .test(
          'is-valid-amount',
          formatMessage(
            {
              defaultMessage: 'Minimum amount: {minAmount} {currency}',
              id: 'walletBuy.errorAmountFieldMinAmount',
            },
            {
              minAmount: amountFrom,
              currency: currencyFrom,
            },
          ),
          (value) => {
            if (!value) return false;

            const numValue = parseFloat(value);

            return !Number.isNaN(numValue) && numValue >= amountFrom;
          },
        ),
      termsAccepted: yup.boolean().default(true), // Auto-accept since users already accepted at registration
    })
    .required();
};
