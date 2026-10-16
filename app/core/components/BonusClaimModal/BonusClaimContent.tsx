import { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useSession } from 'next-auth/react';
import { useIntercom } from 'react-use-intercom';

import { useAppCookies } from '@/core/hooks/useAppCookies';
import { IconBitcoin, IconEthereum, IconTron } from '@/core/shared/Icons';
import { Heading } from '@/core/components/Typography/Heading';
import { Box } from '@/core/shared/Box';
import { Select } from '@/core/shared/Select';
import { SelectSize } from '@/core/shared/Select/Select.types';
import { Text } from '@/core/components/Typography/Text';
import { CryptoCodes } from '@/core/domains/currency';
import { BonusOption } from '@/core/components/BonusClaimModal/BonusClaimModal.types';
import {
  Bonus,
  BonusAssignation,
  selectLatestBonus,
  useClaimBonusMutation,
  useGetPlayerBonusesQuery,
} from '@/core/domains/bonus';
import { useAppDispatch } from '@/core/store/store';
import { toggleVIPModal } from '@/core/store/metaSlice';
import { useGetPlayerBalancesQuery } from '@/core/domains/balance';
import { DateFormatsByLanguage } from '@/core/constants/constants';
import { useMediaContext } from '@/core/hooks/useMediaContext';
import { Flex } from '@/core/shared';
import { AnimatedLoader } from '@/core/shared/AnimatedLoader/AnimatedLoader';

import { useNotification } from '@/utils/notifications/notification-context';
import { convertDateToString, formatDateString } from '@/utils/date';

import {
  BonusClaimContainer,
  SelectOption,
  SelectWrapper,
  StyledButton,
  TextUppercase,
} from './BonusClaimModal.styles';

const selectOptions: Array<BonusOption> = [
  {
    label: (
      <SelectOption>
        <Box mr="s" ml="xs">
          <IconBitcoin />
        </Box>
        <Text level="medium">
          <FormattedMessage id="btc" defaultMessage="BTC" />
        </Text>
      </SelectOption>
    ),
    value: 'BTC',
  },
  {
    label: (
      <SelectOption>
        <Box mr="s" ml="xs">
          <IconEthereum />
        </Box>
        <Text level="medium">
          <FormattedMessage id="eth" defaultMessage="ETH" />
        </Text>
      </SelectOption>
    ),
    value: 'ETH',
  },
  {
    label: (
      <SelectOption>
        <Box mr="s" ml="xs">
          <IconTron />
        </Box>
        <Text level="medium">
          <FormattedMessage id="trx" defaultMessage="TRX" />
        </Text>
      </SelectOption>
    ),
    value: 'TRX',
  },
];

export const BonusClaimContent = () => {
  const intl = useIntl();
  const { locale } = intl;
  const {
    cookies: { activeBalance = 'BTC' },
  } = useAppCookies();
  const dispatch = useAppDispatch();
  const [currency, setCurrency] = useState<CryptoCodes>(activeBalance);
  const { addNotification } = useNotification();
  const { trackEvent } = useIntercom();

  const { data: session } = useSession();
  const { device } = useMediaContext();

  const [claimBonus, { isLoading: isClaimBonusLoading }] = useClaimBonusMutation();
  const { data: userBalances, refetch: refetchBalances } = useGetPlayerBalancesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const filterResult = (result: any) => {
    if (!result) return [];

    return result.filter((resultItem: BonusAssignation) => {
      return resultItem.bonus?.type !== 'reload';
    });
  };

  const {
    refetch: refetchBonus,
    latestBonus,
    isFetching: isBonusesFetching,
  } = useGetPlayerBonusesQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: filterResult(result?.data),
      latestBonus: selectLatestBonus(filterResult(result?.data) || []),
    }),
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const messages = defineMessages({
    endAtText: {
      id: 'bonusModal.endAtText',
      defaultMessage: 'This bonus is available until {date}.',
    },
  });

  const dateFormat = DateFormatsByLanguage[locale];

  /**
   * Calculate the bonus expiry date based on lifetime or explicit endAt
   * If lifetime is set, add lifetime seconds (converted to milliseconds) to startAt
   * Otherwise, use the explicit endAt date
   */
  const getBonusExpiryDateFormatted = (bonus: Bonus, fmt: string): string => {
    let expiryDate: Date;

    if (bonus?.parameters?.lifetime) {
      const startAtTime = new Date(bonus.startAt).getTime(); // Convert startAt string to timestamp
      const lifetimeInMs = bonus.parameters.lifetime;

      expiryDate = new Date(startAtTime + lifetimeInMs);
    } else {
      expiryDate = new Date(bonus.endAt);
    }

    return convertDateToString(expiryDate, fmt);
  };

  const handleClaimBonus = async () => {
    try {
      if (!latestBonus) {
        return;
      }
      await claimBonus({ bonusId: latestBonus.bonus.id, coin: currency }).unwrap();

      // get form data
      const eventData: { [key: string]: any } = {
        user_id: session?.player?.userId,
        bonusId: latestBonus.bonus.id,
        coin: currency,
        timestamp: new Date().toISOString(),
        device,
      };

      if (userBalances?.length) {
        userBalances.reduce((acc, { coin, value, precision }) => {
          acc[`balance_${coin}`] = (Number(value) || 0) / 10 ** (Number(precision) || 0);

          return acc;
        }, eventData);
      }

      trackEvent('bonus_claimed', eventData);

      refetchBonus();
      refetchBalances();
      addNotification({
        type: 'success',
        title: <FormattedMessage defaultMessage="Success" id="notification.successTitle" />,
        text: 'Account credited',
      });
      dispatch(toggleVIPModal());
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      addNotification({
        type: 'error',
        title: <FormattedMessage defaultMessage="Error" id="notification.errorTitle" />,
        text: 'An error occurred, please try later',
      });
    }
  };

  useEffect(() => {
    setCurrency(activeBalance);
  }, [activeBalance]);

  if (isBonusesFetching) {
    return (
      <BonusClaimContainer>
        <Flex justifyContent="center" alignItems="center">
          <AnimatedLoader />
        </Flex>
      </BonusClaimContainer>
    );
  }

  if (!latestBonus) {
    return (
      <BonusClaimContainer>
        <Box mb="l">
          <Heading align="center" size="h3">
            <FormattedMessage defaultMessage="No Bonus Available" id="bonusModal.noBonusAvailable" />
          </Heading>
        </Box>
      </BonusClaimContainer>
    );
  }

  const availableCurrencies = latestBonus.limitations
    ? selectOptions.filter((option) => latestBonus.limitations.includes(option.value))
    : selectOptions;

  return (
    <BonusClaimContainer>
      <Box mb="l">
        <Heading align="center" size="h3">
          {latestBonus.bonus.name}
        </Heading>
        <Text level="medium">{latestBonus.bonus.description}</Text>
      </Box>

      <Box mb="l">
        <Text level="medium">
          {availableCurrencies.length === 1 ? (
            <FormattedMessage
              defaultMessage="This bonus is available in this currency"
              id="bonusModal.bonusAvailableInThisCurrency"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Select your favourite currency"
              id="bonusModal.selectYourFavouriteCurrency"
            />
          )}
        </Text>
      </Box>

      <SelectWrapper>
        <Select
          isDisabled={availableCurrencies.length === 1}
          onChange={(option) => setCurrency((option as BonusOption).value)}
          options={selectOptions}
          size={SelectSize.Big}
          value={availableCurrencies.find((el) => el.value === currency)}
        />
      </SelectWrapper>

      <StyledButton onClick={handleClaimBonus} disabled={isClaimBonusLoading}>
        <TextUppercase level="medium">
          <FormattedMessage defaultMessage="Claim" id="bonusModal.button" />
        </TextUppercase>
      </StyledButton>

      <Box mb="l" mt="l">
        <Text level="medium">
          {intl.formatMessage(messages.endAtText, {
            date: getBonusExpiryDateFormatted(latestBonus.bonus, dateFormat),
          })}
        </Text>
      </Box>
    </BonusClaimContainer>
  );
};
