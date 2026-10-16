import { FC, useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import { useIntercom } from 'react-use-intercom';
import { yupResolver } from '@hookform/resolvers/yup';
import BigNumber from 'bignumber.js';
import { useSession } from 'next-auth/react';

import { CryptoIcon } from '@/core/shared/CryptoIcon';
import { Box } from '@/core/shared/Box';
import { Button } from '@/core/shared/Button';
import { Dropdown, DropdownContainer, DropdownItem, DropdownMenu } from '@/core/components/Dropdown';
import { Divider, Flex } from '@/core/shared';
import { Input } from '@/core/shared/Input';
import { ButtonSize } from '@/core/shared/Button/Button.types';
import { Balance, useGetPlayerBalancesQuery } from '@/core/domains/balance';
import { CryptoCodes } from '@/core/domains/currency';
import {
  EFeeType,
  useGetEstimatedFeesQuery,
  usePostWithdrawRequestMutation,
  WithdrawRequest,
} from '@/core/domains/wallet';
import { getMaxRequestedAmount, getTotalToWithdraw, getValueToDisplay } from '@/core/domains/currency/logic.helper';
import { useNotification } from '@/core/hooks/useNotification';
import { useAppCookies } from '@/core/hooks/useAppCookies';
import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { useMediaContext } from '@/core/hooks/useMediaContext';
import { AnimatedLoader } from '@/core/shared/AnimatedLoader/AnimatedLoader';

import { theme } from '@/themes/main';

import { SupportButton, SupportText } from '../WalletModalDeposit/WalletModalDeposit.styles';
import {
  WalletModalFeesTable,
  WalletModalLabel,
  WalletModalWithdrawContainer,
  WithdrawButton,
} from './WalletModalWithdraw.styles';
import { WithdrawModalForm, WithdrawModalProps } from './WalletModalWithdraw.types';
import { useWalletWithdrawValidation } from './WalletModalWithdraw.validation';

export const WalletModalWithdraw: FC<WithdrawModalProps> = (props) => {
  const { setIsOpen } = props;

  const {
    cookies: { activeBalance: initialActiveBalance = 'BTC' },
  } = useAppCookies();

  const [activeBalance, setActiveBalance] = useState<Balance | undefined>();
  const [requestedAmount, setRequestedAmount] = useState('');
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<CryptoCodes>(initialActiveBalance);

  const { formatCryptoPrice } = useDisplayPrice();
  const { show: openLiveSupport, trackEvent } = useIntercom();
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();
  const { device } = useMediaContext();

  const { data: sessionData } = useSession();

  const {
    data: estimatedFeesData,
    isLoading: isEstimatedFeesDataLoading,
    isError: isEstimatedFeesDataError,
  } = useGetEstimatedFeesQuery(selectedCurrencyCode, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const {
    data: userBalances,
    isLoading: isUserBalancesLoading,
    isError: isUserBalancesError,
    refetch: refetchUserBalances,
  } = useGetPlayerBalancesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const [postWithdrawRequest, { isSuccess: isWithdrawSubmissionSuccess, isError: isWithdrawSubmissionError }] =
    usePostWithdrawRequestMutation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
    getValues,
  } = useForm<WithdrawModalForm>({
    defaultValues: { currency: selectedCurrencyCode },
    mode: 'onSubmit',
    resolver: yupResolver(
      useWalletWithdrawValidation({
        maxAmount: getMaxRequestedAmount(activeBalance, estimatedFeesData),
        currency: estimatedFeesData?.currency || selectedCurrencyCode,
        minWithdrawal: estimatedFeesData?.minWithdrawal || '',
      }),
    ),
  });

  useEffect(() => {
    if (userBalances) {
      changeCurrency(selectedCurrencyCode);
    }
  }, [userBalances]);

  useEffect(() => {
    if (isWithdrawSubmissionSuccess) {
      // get form data
      const eventData: { [key: string]: any } = {
        user_id: sessionData?.player?.userId,
        currency: getValues('currency'),
        address: getValues('address'),
        amount: getValues('amount'),
        timestamp: new Date().toISOString(),
        device,
      };

      if (userBalances?.length) {
        userBalances.reduce((acc, { coin, value, precision }) => {
          acc[`balance_${coin}`] = (Number(value) || 0) / 10 ** (Number(precision) || 0);

          return acc;
        }, eventData);
      }

      trackEvent('withdraw_request', eventData);

      refetchUserBalances();
      setIsOpen(false);

      addNotification({
        text: formatMessage({
          id: 'success.withdrawSubmission',
          defaultMessage: 'Your withdrawal request has been sent',
        }),
        title: formatMessage({ id: 'notification.successTitle', defaultMessage: 'Success' }),
        type: 'success',
      });
    }

    if (isWithdrawSubmissionError) {
      addNotification({
        text: formatMessage({
          id: 'error.somethingWentWrongTryAgainOrReloadPage',
          defaultMessage: 'Something went wrong. Please try again or reload the page if the problem persist',
        }),
        title: formatMessage({ id: 'notification.errorTitle', defaultMessage: 'Error' }),
        type: 'error',
      });
    }
  }, [isWithdrawSubmissionSuccess, isWithdrawSubmissionError]);

  const changeCurrency = useCallback(
    (currency: CryptoCodes) => {
      if (!userBalances) return;

      const selectedBalance = userBalances.find((balance) => balance.coin === currency);

      setActiveBalance(selectedBalance);
      setRequestedAmount('0');
      setSelectedCurrencyCode(currency);
      setValue('currency', currency);
      setValue('amount', 0);
    },
    [setValue, userBalances],
  );

  const onSubmit = async (formData: WithdrawModalForm) => {
    const requestBody: WithdrawRequest = {
      currency: formData.currency,
      amount: `${formData.amount}`,
      info: {
        type: 'crypto',
        address: formData.address,
      },
    };

    await postWithdrawRequest(requestBody);
  };

  const setMaxRequestedAmount = useCallback(() => {
    if (isEstimatedFeesDataLoading || !activeBalance || !estimatedFeesData || !userBalances) {
      return;
    }

    // Max requested amount will always be the current user balance minus the current fees
    const maxRequestedAmount = getMaxRequestedAmount(activeBalance, estimatedFeesData);

    setRequestedAmount(`${maxRequestedAmount}`);
    setValue('amount', maxRequestedAmount, { shouldValidate: true });
  }, [setValue, selectedCurrencyCode, estimatedFeesData, activeBalance]);

  if (isUserBalancesLoading || isEstimatedFeesDataLoading) {
    return (
      <WalletModalWithdrawContainer>
        <Flex justifyContent="center" alignItems="center">
          <AnimatedLoader />
        </Flex>
      </WalletModalWithdrawContainer>
    );
  }

  if (isUserBalancesError || isEstimatedFeesDataError || !userBalances || !activeBalance || !estimatedFeesData) {
    return (
      <WalletModalWithdrawContainer>
        <p>
          <FormattedMessage
            id="error.somethingWentWrongTryAgainOrReloadPage"
            defaultMessage="Something went wrong. Please try again or reload the page if the problem persist."
          />
        </p>

        <p>
          <FormattedMessage
            id="error.inCaseOfDoubtsChatSupport"
            defaultMessage="In case of any doubts, you can start a chat with our support"
          />

          <SupportButton onClick={openLiveSupport} title="Open live support">
            <SupportText>
              <FormattedMessage id="walletDeposit.inactiveContact.link" defaultMessage="here" />
            </SupportText>
          </SupportButton>
        </p>
      </WalletModalWithdrawContainer>
    );
  }

  const totalToWithdraw = getTotalToWithdraw(requestedAmount, estimatedFeesData, activeBalance);

  return (
    <WalletModalWithdrawContainer>
      <Flex justifyContent="center" alignItems="center" width="100%">
        <Dropdown
          // we must set menu container above the modal
          zIndex={theme.zIndexes.modal + 1}
          content={
            <DropdownMenu width={200}>
              {userBalances.map((balance) => (
                <DropdownItem
                  key={balance.coin}
                  iconLeft={<CryptoIcon code={balance.coin} />}
                  onClick={() => changeCurrency(balance.coin)}
                >
                  {formatCryptoPrice({
                    amount: balance.value,
                    cryptoCode: balance.coin,
                    maximumFractionDigits: 8,
                  })}
                </DropdownItem>
              ))}
            </DropdownMenu>
          }
        >
          <DropdownContainer displayArrow iconLeft={<CryptoIcon code={selectedCurrencyCode} />}>
            {formatCryptoPrice({
              amount: activeBalance.value,
              cryptoCode: activeBalance.coin,
              maximumFractionDigits: 8,
            })}
          </DropdownContainer>
        </Dropdown>
      </Flex>

      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Box mt="l">
          <Input
            {...register('address')}
            error={errors.address?.message}
            iconRight={<CryptoIcon code={selectedCurrencyCode} size="l" />}
            name="address"
            placeholder={formatMessage(
              {
                id: 'walletModal.addressInput',
                defaultMessage: 'Enter your {currency} address',
              },
              { currency: selectedCurrencyCode },
            )}
          />
        </Box>

        <Box mt="l">
          <Input
            {...register('amount')}
            button={
              <Button onClick={setMaxRequestedAmount} size={ButtonSize.Small} type="button">
                <FormattedMessage id="walletModal.withdrawMaxButton" defaultMessage="Max" />
              </Button>
            }
            error={errors.amount?.message}
            name="amount"
            onChange={(e) => setRequestedAmount(e.target.value)}
            placeholder={formatMessage({
              id: 'walletModal.amountInput',
              defaultMessage: 'Amount you will receive',
            })}
            type="number"
          />

          <WalletModalLabel type="tertiary" style={{ marginTop: 4 }}>
            <FormattedMessage id="walletModal.withdrawMinimalCopy" defaultMessage="Minimum withdrawal" />
            {': '}
            {estimatedFeesData.minWithdrawal} <CryptoIcon size="s" code={selectedCurrencyCode} />
          </WalletModalLabel>
        </Box>

        <Divider m="s" />

        <WalletModalFeesTable>
          <tbody>
            <tr>
              <th>
                <WalletModalLabel type="tertiary">
                  {formatMessage({
                    id: 'walletModal.transactionFees',
                    defaultMessage: 'Transaction Fees',
                  })}
                </WalletModalLabel>
              </th>

              <td>
                <WalletModalLabel type="tertiary">
                  {estimatedFeesData.feeSettings.value}
                  {estimatedFeesData.feeSettings.type === EFeeType.PERCENTAGE ? (
                    '%'
                  ) : (
                    <CryptoIcon code={selectedCurrencyCode} size="l" />
                  )}
                </WalletModalLabel>
              </td>
            </tr>

            <tr>
              <th>
                <WalletModalLabel type="secondary">
                  {formatMessage({
                    id: 'walletModal.calculatedFees',
                    defaultMessage: 'Calculated Fees',
                  })}
                </WalletModalLabel>
              </th>

              <td>
                <WalletModalLabel type="secondary">
                  {getValueToDisplay(
                    BigNumber(totalToWithdraw).minus(requestedAmount).toNumber(),
                    activeBalance.precision,
                    String(estimatedFeesData.feeSettings.value).length - 2,
                  )}

                  <CryptoIcon code={selectedCurrencyCode} size="l" />
                </WalletModalLabel>
              </td>
            </tr>

            <tr>
              <th>
                <WalletModalLabel type="secondary">
                  {formatMessage({
                    id: 'walletModal.totalEstimatedAmount',
                    defaultMessage: 'Total Estimated Amount',
                  })}
                </WalletModalLabel>
              </th>

              <td>
                <WalletModalLabel type="secondary">
                  {getValueToDisplay(totalToWithdraw, activeBalance.precision)}

                  <CryptoIcon code={selectedCurrencyCode} size="l" />
                </WalletModalLabel>
              </td>
            </tr>

            <tr>
              <th>
                <WalletModalLabel>
                  <strong>
                    {formatMessage({
                      id: 'walletModal.youWillReceive',
                      defaultMessage: 'You’ll Receive',
                    })}
                  </strong>
                </WalletModalLabel>
              </th>

              <td>
                <WalletModalLabel>
                  <strong>{getValueToDisplay(requestedAmount, activeBalance.precision)}</strong>

                  <CryptoIcon code={selectedCurrencyCode} size="l" />
                </WalletModalLabel>
              </td>
            </tr>
          </tbody>
        </WalletModalFeesTable>

        <Box mt="l">
          <WithdrawButton
            disabled={isSubmitting || !requestedAmount}
            isLoading={isSubmitting}
            size={ButtonSize.Block}
            type="submit"
          >
            <FormattedMessage id="walletModal.withdraw" defaultMessage="Withdraw" />
          </WithdrawButton>
        </Box>
      </form>
    </WalletModalWithdrawContainer>
  );
};
