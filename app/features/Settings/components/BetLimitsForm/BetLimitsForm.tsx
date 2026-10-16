/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import router from 'next/router';

import { Card, Select } from '@/core/shared';
import { SelectSize } from '@/core/shared/Select/Select.types';
import { useGetPlayerLimitQuery, useUpdatePlayerLimitMutation } from '@/core/domains/settings';
import { Text } from '@/core/components/Typography';
import { EFiatCodes } from '@/core/domains/currency';

import { ActionGroup, MessageBox, StyledButton, StyledInput } from '@/features/Settings/Account.styles';
import { BetLimitCurrencyOptions, BetLimitFormData, PeriodOptions, Periods } from '@/features/Settings/Account.types';
import { StyledHeading } from '@/features/Settings/Settings.styles';
import { useBetLimitValidation } from '@/features/Settings/Account.validation';
import { betLimitCurrencyOptions, periodOptions } from '@/features/Settings/constants';
import { ConfirmationModal } from '@/features/Settings/components/ConfirmationModal/ConfirmationModal';

import { theme } from '@/themes/main';

import { FormBox, SelectInputContainer } from './BetLimitsForm.styles';

export const BetLimitsForm = () => {
  const { formatMessage } = useIntl();
  const { data: session } = useSession();
  const { data: betLimitInfo, refetch } = useGetPlayerLimitQuery(session?.accessToken);
  const [updatePlayerLimit] = useUpdatePlayerLimitMutation();

  const [didBetLimitSet, setDidBetLimitSet] = useState(betLimitInfo?.limit !== undefined && betLimitInfo?.limit > 0);
  const [betLimitCurrency, setBetLimitCurrency] = useState(betLimitInfo?.currency || EFiatCodes.EUR);
  const [betLimitPeriod, setBetLimitPeriod] = useState(didBetLimitSet ? betLimitInfo?.limitPeriod : Periods.DAILY);
  const [betLimit, setBetLimit] = useState(didBetLimitSet ? betLimitInfo?.limit.toString() : '0');
  const [isBetLimitConfirmationModalOpen, setIsBetLimitConfirmationModalOpen] = useState(false);

  const betLimitFormData = useForm<BetLimitFormData>({
    mode: 'onSubmit',
    resolver: yupResolver(useBetLimitValidation()),
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = betLimitFormData;

  const openBetLimitConfirmationModal = (formData: BetLimitFormData) => {
    setBetLimit(formData.limit ?? '0');
    setIsBetLimitConfirmationModalOpen(true);
  };

  const onBetLimitSubmit = () => {
    const sanitizedValue = parseFloat((betLimit as string).replace(/,/g, '.'));
    const convertedAmountToNumber = parseFloat(sanitizedValue.toFixed(2));

    if (convertedAmountToNumber && betLimitPeriod && betLimitCurrency) {
      const limitInfo = {
        limit: convertedAmountToNumber,
        limitPeriod: betLimitPeriod,
        currency: betLimitCurrency,
      };

      updatePlayerLimit({
        limitInfo,
        accessToken: session?.accessToken,
      });
    }
    setIsBetLimitConfirmationModalOpen(false);
    setDidBetLimitSet(true);

    return true;
  };

  const getBetLimit = () => {
    if (betLimitInfo?.limit === undefined) {
      return undefined;
    }

    if (betLimitInfo.limit > 0) {
      return betLimitInfo?.limit.toString();
    }

    return undefined;
  };

  useEffect(() => {
    const handleRouteChange = () => {
      refetch();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [refetch]);

  useEffect(() => {
    setBetLimit(betLimitInfo?.limit?.toString());
    setDidBetLimitSet(betLimitInfo?.limit !== undefined && betLimitInfo?.limit > 0);
  }, [betLimitFormData]);

  return (
    <>
      <Card backgroundColor={theme.rebrandingColors.backgroundColor} padding="l">
        <StyledHeading size="h4">
          <FormattedMessage id="betLimit" defaultMessage="Bet Limit" />
        </StyledHeading>

        <Text level="medium" type="subtle" marginBottom="m">
          <FormattedMessage id="account.limitSetup" defaultMessage="Setup a bet limit on your account" />
        </Text>

        <form onSubmit={handleSubmit(openBetLimitConfirmationModal)}>
          <FormBox>
            <StyledInput
              {...register('limit')}
              placeholder={formatMessage({
                defaultMessage: 'Amount',
                id: 'account.limitPlaceholder',
              })}
              defaultValue={getBetLimit()}
              error={errors.limit?.message}
              disabled={!!getBetLimit() || didBetLimitSet}
              caption={formatMessage({
                defaultMessage: 'Setting limits to zero will remove your current limits.',
                id: 'account.limitSetupInfo',
              })}
            />

            <SelectInputContainer>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    // @ts-expect-error: ref null is needed here
                    ref={null}
                    defaultValue={betLimitCurrencyOptions[0]}
                    size={SelectSize.Big}
                    placeholder={formatMessage({
                      defaultMessage: 'EUR',
                      id: 'account.betLimitCurrencyOptions.euro',
                    })}
                    options={betLimitCurrencyOptions}
                    onChange={(option) => setBetLimitCurrency((option as BetLimitCurrencyOptions).value)}
                    isDisabled={didBetLimitSet}
                  />
                )}
              />

              <Controller
                name="limitPeriod"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    // @ts-expect-error: ref null is needed here
                    ref={null}
                    defaultValue={periodOptions[0]}
                    size={SelectSize.Big}
                    placeholder={formatMessage({
                      defaultMessage: '24 hours',
                      id: 'account.limitDurationOptions.oneDay',
                    })}
                    options={periodOptions}
                    onChange={(option) => setBetLimitPeriod((option as PeriodOptions).value)}
                    isDisabled={didBetLimitSet}
                  />
                )}
              />
            </SelectInputContainer>
          </FormBox>

          <ActionGroup>
            <StyledButton disabled={didBetLimitSet} type="submit" data-mocked>
              <FormattedMessage id="preferences.save" defaultMessage="Save" />
            </StyledButton>
          </ActionGroup>
        </form>
      </Card>

      <ConfirmationModal
        isOpen={isBetLimitConfirmationModalOpen}
        setIsOpen={setIsBetLimitConfirmationModalOpen}
        header={formatMessage({
          defaultMessage: 'Bet Limit',
          id: 'betLimit',
        })}
        hasCloseButton
        onClick={onBetLimitSubmit}
      >
        <MessageBox>
          <Text level="medium">
            <FormattedMessage id="account.message.info" defaultMessage="This limit becomes active immediately." />{' '}
            <strong>
              <FormattedMessage
                id="account.message.alert"
                defaultMessage="You will not be able to bet more than your limit."
              />
            </strong>
          </Text>

          <Text level="medium">
            <FormattedMessage
              id="account.message.rewrite"
              defaultMessage="If you have already set a limit, it will be rewritten."
            />
          </Text>
        </MessageBox>
      </ConfirmationModal>
    </>
  );
};
