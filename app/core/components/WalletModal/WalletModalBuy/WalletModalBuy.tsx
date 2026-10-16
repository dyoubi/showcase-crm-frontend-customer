import { FormattedMessage, useIntl } from 'react-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import { SelectSize } from '@/core/shared/Select/Select.types';
import { routePaths } from '@/core/constants/routes';
import { IconBitcoin, IconClose, IconEthereum, IconEur, IconLoader, IconTron, IconUsd } from '@/core/shared/Icons';
import {
  ChangellyDepositOffer,
  ChangellyDepositRequest,
  useGetPlayerDepositAddressesQuery,
  usePostChanellyDepositOffersRequestMutation,
  usePostChanellyDepositRequestMutation,
} from '@/core/domains/wallet';
import { useGetPlayerQuery } from '@/core/domains/player';
import { useNotification } from '@/core/hooks/useNotification';
import { ButtonSize } from '@/core/shared/Button/Button.types';
import { useGetCryptoToFiatConversion } from '@/core/domains/currency';
import { useAppCookies } from '@/core/hooks/useAppCookies';
import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';

import { StyledLink } from '@/features/Auth/components/LoginModal/RegisterForm/RegisterForm.styles';

import {
  AmountInput,
  BuyButton,
  ClearBtn,
  CurrencyIcon,
  CurrencySectionInner,
  CurrencySectionWrapper,
  FormContainer,
  FormError,
  OfferLogo,
  OfferOptions,
  PaymentButton,
  PaymentOptions,
  PaymentWrapper,
  SelectBox,
  StyledSelect,
  TermsNote,
} from './WalletModalBuy.styles';
import { ChangellyDepositForm } from './WalletModalBuy.types';
import { useWalletBuyValidation } from './WalletModalBuy.validation';
import { getActiveProviders } from './providers.config';

// Get active providers from configuration
const providers = getActiveProviders();

// Currency filter options
const filterOptions = [
  { label: 'BTC', value: 'btc', icon: <IconBitcoin size={14} /> },
  { label: 'ETH', value: 'eth', icon: <IconEthereum size={14} /> },
  { label: 'TRX', value: 'trx', icon: <IconTron size={14} /> },
];

const filterOptions2 = [
  { label: 'EUR', value: 'eur', icon: <IconEur size={14} /> },
  { label: 'USD', value: 'usd', icon: <IconUsd size={14} /> },
  { label: 'GBP', value: 'gbp', icon: <IconUsd size={14} /> },
  { label: 'CAD', value: 'cad', icon: <IconUsd size={14} /> },
  { label: 'AUD', value: 'aud', icon: <IconUsd size={14} /> },
  { label: 'NZD', value: 'nzd', icon: <IconUsd size={14} /> },
  { label: 'BRL', value: 'brl', icon: <IconUsd size={14} /> },
  { label: 'DKK', value: 'dkk', icon: <IconUsd size={14} /> },
  { label: 'HKD', value: 'hkd', icon: <IconUsd size={14} /> },
  { label: 'PLN', value: 'pln', icon: <IconUsd size={14} /> },
  { label: 'QAR', value: 'qar', icon: <IconUsd size={14} /> },
  { label: 'SGD', value: 'sgd', icon: <IconUsd size={14} /> },
];

// this is because cant send localhost
const getWindowUrl = () => {
  if (window.location.origin.includes('localhost')) {
    return 'https://develop.bitplay.com';
  }

  return window.location.origin;
};

export const WalletModalBuy = () => {
  const [availableOffers, setAvailableOffers] = useState<Array<ChangellyDepositOffer>>([]);
  const [lastRequestParams, setLastRequestParams] = useState<string>('');

  const [limitErrorMessage, setLimitErrorMessage] = useState<string>('');

  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();
  const { formatPrice } = useDisplayPrice();
  const router = useRouter();
  const { locale: currentLocale } = router;

  const { cookies } = useAppCookies();

  const { data: playerData } = useGetPlayerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const convertCryptoToFiat = useGetCryptoToFiatConversion();

  const { data: depositAddressesMap } = useGetPlayerDepositAddressesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [
    postChanellyDepositOffersRequest,
    {
      data: changellyOffersResponse,
      isLoading: isChanellyDepositOffersSubmissionLoading,
      isSuccess: isChanellyDepositOffersSubmissionSuccess,
      isError: isChanellyDepositOffersSubmissionError,
    },
  ] = usePostChanellyDepositOffersRequestMutation();

  const [
    postChanellyDepositRequest,
    {
      data: changellyResponse,
      isSuccess: isChanellyDepositSubmissionSuccess,
      isError: isChanellyDepositSubmissionError,
      error: changellyError,
    },
  ] = usePostChanellyDepositRequestMutation();

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid: isFormValid },
    register,
    setValue,
    reset,
    watch,
  } = useForm<ChangellyDepositForm>({
    defaultValues: {
      providerCode: providers[0].value,
      currencyFrom: 'EUR',
      currencyTo: cookies.activeBalance || 'BTC',
      amountFrom: '200',
      termsAccepted: true, // Auto-accept since users already accepted at registration
    },
    mode: 'onSubmit',
    resolver: yupResolver(
      useWalletBuyValidation({
        providerCode: '',
        currencyFrom: 'EUR',
        currencyTo: cookies.activeBalance || 'BTC',
        amountFrom: 1, // minimum amount for validation
        termsAccepted: true, // Auto-accept since users already accepted at registration
      }),
    ),
  });

  // Watch form values to update UI
  const watchedValues = watch();

  // Memoize currency options to prevent unnecessary re-renders
  const currencyFromOptions = useMemo(
    () =>
      filterOptions2.find((option) => option.value === watchedValues.currencyFrom?.toLowerCase()) || filterOptions2[0],
    [watchedValues.currencyFrom],
  );

  const currencyToOptions = useMemo(
    () => filterOptions.find((option) => option.value === watchedValues.currencyTo?.toLowerCase()) || filterOptions[0],
    [watchedValues.currencyTo],
  );

  // Memoize current amount for performance
  const currentAmountFrom = useMemo(() => watchedValues.amountFrom || '', [watchedValues.amountFrom]);

  // Memoize current price calculation
  const currentPrice = useMemo(
    () =>
      convertCryptoToFiat({
        amount: 1,
        cryptoCode: watchedValues.currencyTo || 'BTC',
        fiatCode: watchedValues.currencyFrom || 'USD',
      }),
    [convertCryptoToFiat, watchedValues.currencyTo, watchedValues.currencyFrom],
  );

  // Optimized submit handler
  const onSubmit = useCallback(
    async (formData: ChangellyDepositForm) => {
      const requestBody: ChangellyDepositRequest = {
        ownerId: playerData?.id || '',
        providerCode: formData.providerCode,
        currencyFrom: formData.currencyFrom,
        currencyTo: formData.currencyTo,
        amountFrom: formData.amountFrom,
        country: playerData?.address?.country || '',
        walletAddress: depositAddressesMap?.[formData.currencyTo]?.[0]?.address || '',
        baseURL: getWindowUrl(),
      };

      await postChanellyDepositRequest(requestBody);
    },
    [playerData?.id, playerData?.address?.country, depositAddressesMap, postChanellyDepositRequest],
  );

  // Optimized handlers
  const handleCurrencyFromChange = useCallback(
    (selectedOption: any) => {
      setValue('currencyFrom', selectedOption.value.toUpperCase());
    },
    [setValue],
  );

  const handleCurrencyToChange = useCallback(
    (selectedOption: any) => {
      setValue('currencyTo', selectedOption.value.toUpperCase());
    },
    [setValue],
  );

  const handleProviderSelect = useCallback(
    (providerValue: string) => {
      setValue('providerCode', providerValue);
    },
    [setValue],
  );

  const clearAmount = useCallback(() => {
    setValue('amountFrom', '');
  }, [setValue]);

  useEffect(() => {
    if (isChanellyDepositSubmissionSuccess) {
      if (changellyResponse?.redirectUrl) {
        addNotification({
          type: 'success',
          title: formatMessage({ id: 'notification.successTitle', defaultMessage: 'Success' }),
          text: formatMessage({
            id: 'walletBuy.successRedirect',
            defaultMessage: 'You will be redirected to the payment provider.',
          }),
        });

        // Redirect to the payment provider's page
        reset();
        window.open(changellyResponse.redirectUrl, '_blank');

        return;
      }
    }

    if (isChanellyDepositSubmissionError) {
      // Safely parse the error to check for specific error types
      let errorType = null;

      try {
        if (changellyError && 'error' in changellyError && typeof changellyError.error === 'string') {
          const errorData = JSON.parse(changellyError.error);

          errorType = errorData?.errorType;
        }
      } catch (parseError) {
        // Error parsing, will use generic error message
      }

      // Show different notification based on error type
      if (errorType === 'unavailable') {
        addNotification({
          type: 'error',
          title: formatMessage({ id: 'notification.errorTitle', defaultMessage: 'Error' }),
          text: formatMessage({
            id: 'walletBuy.providerUnavailable',
            defaultMessage: 'Provider is unavailable now, try using another provider or retry this call later.',
          }),
        });
      } else {
        // Handle other errors with generic message
        addNotification({
          type: 'error',
          title: formatMessage({ id: 'notification.errorTitle', defaultMessage: 'Error' }),
          text: formatMessage({
            id: 'walletBuy.errorMessage',
            defaultMessage: 'There was an error processing your request.',
          }),
        });
      }
    }
  }, [isChanellyDepositSubmissionSuccess, isChanellyDepositSubmissionError, changellyResponse]);

  useEffect(() => {
    if (isChanellyDepositOffersSubmissionSuccess) {
      if (changellyOffersResponse?.length) {
        const offersforprovider = changellyOffersResponse.find(
          (offer) => offer.providerCode === watchedValues.providerCode,
        );

        if (offersforprovider?.errorType && offersforprovider?.errorType === 'limits') {
          if (offersforprovider.errorMessage === 'Too high in amount') {
            setLimitErrorMessage(
              formatMessage({
                id: 'walletBuy.limitsErrorTooHigh',
                defaultMessage: `Amount is too high`,
              }),
            );
          }

          if (offersforprovider.errorMessage === 'Too low in amount') {
            setLimitErrorMessage(
              formatMessage({
                id: 'walletBuy.limitsErrorTooLow',
                defaultMessage: `Amount is too low`,
              }),
            );
          }
          setAvailableOffers([]);
        } else {
          setAvailableOffers(offersforprovider?.paymentMethodOffer || []);
        }
      } else {
        setAvailableOffers([]);
      }
    }

    if (isChanellyDepositOffersSubmissionError) {
      // Handle error, e.g., show an error message
      addNotification({
        type: 'error',
        title: formatMessage({ id: 'notification.errorTitle', defaultMessage: 'Error' }),
        text: formatMessage({
          id: 'walletBuy.offersError',
          defaultMessage: 'There was an error fetching deposit offers.',
        }),
      });
      setAvailableOffers([]);
    }
  }, [isChanellyDepositOffersSubmissionSuccess, isChanellyDepositOffersSubmissionError, changellyOffersResponse]);

  // Debounced effect to refresh offers when amount changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        watchedValues.amountFrom &&
        parseFloat(watchedValues.amountFrom) > 0 &&
        watchedValues.providerCode &&
        watchedValues.currencyFrom &&
        watchedValues.currencyTo &&
        playerData?.address?.country
      ) {
        const requestParams = JSON.stringify({
          providerCode: watchedValues.providerCode,
          currencyFrom: watchedValues.currencyFrom,
          currencyTo: watchedValues.currencyTo,
          amountFrom: watchedValues.amountFrom,
          country: playerData.address.country,
        });

        // Only make request if parameters have changed
        if (requestParams !== lastRequestParams) {
          setLastRequestParams(requestParams);
          setLimitErrorMessage('');
          postChanellyDepositOffersRequest({
            providerCode: watchedValues.providerCode,
            currencyFrom: watchedValues.currencyFrom,
            currencyTo: watchedValues.currencyTo,
            amountFrom: watchedValues.amountFrom,
            country: playerData.address.country,
          });
        }
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [
    watchedValues.providerCode,
    watchedValues.currencyFrom,
    watchedValues.currencyTo,
    watchedValues.amountFrom,
    playerData?.address?.country,
    lastRequestParams,
    postChanellyDepositOffersRequest,
  ]);

  return (
    <FormContainer>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <CurrencySectionWrapper>
          <CurrencySectionInner>
            <SelectBox>
              <StyledSelect
                size={SelectSize.Small}
                options={filterOptions2}
                defaultValue={currencyFromOptions}
                value={currencyFromOptions}
                onChange={handleCurrencyFromChange}
                name="currencyFrom"
                isSearchable={false}
              />
              <CurrencyIcon>{currencyFromOptions?.icon || <IconUsd size={14} />}</CurrencyIcon>
            </SelectBox>
            <AmountInput placeholder="0" {...register('amountFrom')} />
            {currentAmountFrom && parseFloat(currentAmountFrom) > 0 && (
              <ClearBtn onClick={clearAmount} title="Clear">
                <IconClose color="white" size={18} />
              </ClearBtn>
            )}
          </CurrencySectionInner>
        </CurrencySectionWrapper>
        {errors.amountFrom && <FormError>{errors.amountFrom.message}</FormError>}
        <CurrencySectionWrapper>
          <CurrencySectionInner>
            <SelectBox>
              <StyledSelect
                size={SelectSize.Small}
                options={filterOptions}
                defaultValue={currencyToOptions}
                value={currencyToOptions}
                onChange={handleCurrencyToChange}
                name="currencyTo"
                isSearchable={false}
              />
              <CurrencyIcon>{currencyToOptions?.icon || <IconBitcoin size={14} />}</CurrencyIcon>
            </SelectBox>
            <AmountInput
              readOnly
              placeholder="Amount will be calculated"
              value={
                currentPrice
                  ? formatPrice({
                      amount: Number(watchedValues.amountFrom) / currentPrice,
                      withoutCryptoUnit: true,
                      currency: watchedValues.currencyTo || 'BTC',
                      maximumFractionDigits: 8,
                    })
                  : formatMessage({
                      defaultMessage: 'The crypto estimate is temporarily unavailable',
                      id: 'buyCrypto.estimateUnavailable',
                    })
              }
            />
          </CurrencySectionInner>
        </CurrencySectionWrapper>
        <PaymentWrapper>
          <p>
            {formatMessage({
              defaultMessage: 'Payment Method',
              id: 'buyCrypto.method',
            })}
          </p>
          <PaymentOptions>
            {providers.map((provider) => (
              <PaymentButton
                type="button"
                size={ButtonSize.Small}
                selected={watchedValues.providerCode === provider.value}
                key={provider.value}
                onClick={() => handleProviderSelect(provider.value)}
                title={provider.label}
              >
                {provider.label}
              </PaymentButton>
            ))}
          </PaymentOptions>
          {errors.providerCode && <FormError>{errors.providerCode.message}</FormError>}
        </PaymentWrapper>
        <PaymentWrapper>
          <p>
            {formatMessage({
              defaultMessage: 'Payment Offers',
              id: 'buyCrypto.offers',
            })}
          </p>
          <OfferOptions>
            {(() => {
              if (isChanellyDepositOffersSubmissionLoading) {
                return (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <IconLoader size={72} />
                  </div>
                );
              }

              if (availableOffers.length === 0 && limitErrorMessage) {
                return <div style={{ textAlign: 'center', padding: '4px' }}>{limitErrorMessage}</div>;
              }

              if (availableOffers.length === 0 && !limitErrorMessage) {
                return (
                  <div style={{ textAlign: 'center', padding: '4px' }}>
                    <FormattedMessage id="registerForm.noOffers" defaultMessage="No Payment Offers Available" />
                  </div>
                );
              }

              return availableOffers.map((e) => (
                <OfferLogo key={e.offerId}>
                  <img
                    width="auto"
                    height="20px"
                    src={`/images/logos/${e.method}.${e.method === 'card' ? 'webp' : 'png'}`}
                    alt={e.method}
                  />
                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {e.amountExpectedTo}
                    {currencyToOptions?.icon || <IconBitcoin size={14} />}
                  </div>
                </OfferLogo>
              ));
            })()}
          </OfferOptions>
        </PaymentWrapper>
        <TermsNote>
          <FormattedMessage
            id="walletBuy.termsPassiveNote"
            values={{
              termsAndConditions: (
                <StyledLink
                  target="_blank"
                  href={currentLocale === 'en' ? routePaths.termsOfService.en : routePaths.termsOfService.fr}
                >
                  <FormattedMessage id="registerForm.termsAndConditions" defaultMessage="Terms and Conditions" />
                </StyledLink>
              ),
              privacyPolicy: (
                <StyledLink target="_blank" href={routePaths.privacyPolicy}>
                  <FormattedMessage id="registerForm.privacyPolicy" defaultMessage="Privacy Policy" />
                </StyledLink>
              ),
            }}
            defaultMessage="By continuing, you agree that your transaction is subject to Bitplay {termsAndConditions} & {privacyPolicy}."
          />
        </TermsNote>
        <BuyButton
          type="submit"
          disabled={
            isSubmitting || !isFormValid || isChanellyDepositOffersSubmissionLoading || limitErrorMessage !== ''
          }
          style={{ padding: '20px' }}
        >
          {isSubmitting ? 'Processing...' : 'Buy Now'}
        </BuyButton>
      </form>
    </FormContainer>
  );
};
