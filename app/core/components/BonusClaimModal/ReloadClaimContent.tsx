import { useEffect, useState } from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

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
  BonusAssignation,
  checkIfReloadBonusIsClaimable,
  getNextReloadBonusClaimableDate,
  selectLatestBonus,
  useClaimBonusMutation,
  useGetPlayerBonusesQuery,
} from '@/core/domains/bonus';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { selectActiveReloadBonus, setActiveReloadBonus, toggleVIPModal } from '@/core/store/metaSlice';
import { useGetPlayerBalancesQuery } from '@/core/domains/balance';
import { DateFormatsByLanguage } from '@/core/constants/constants';

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

export const ReloadClaimContent = () => {
  const intl = useIntl();
  const { locale } = intl;
  const {
    cookies: { activeBalance = 'BTC' },
  } = useAppCookies();
  const dispatch = useAppDispatch();
  const [currency, setCurrency] = useState<CryptoCodes>(activeBalance);
  const { addNotification } = useNotification();
  const activeReloadBonus = useAppSelector(selectActiveReloadBonus);
  const [claimBonus, { isLoading }] = useClaimBonusMutation();
  const { refetch: refetchBalances } = useGetPlayerBalancesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });
  const filterResult = (result: any) => {
    if (!result) return [];

    return result.filter((resultItem: BonusAssignation) => {
      return resultItem.bonus?.type === 'reload';
    });
  };
  const {
    refetch: refetchBonus,
    latestBonus,
    isFetching: isBonusesFetching,
  } = useGetPlayerBonusesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    selectFromResult: (result) => ({
      ...{ ...result, data: filterResult(result?.data) },
      latestBonus: selectLatestBonus(filterResult(result?.data) || []),
    }),
  });
  const latestActiveBonus = latestBonus || activeReloadBonus;

  const messages = defineMessages({
    endAtText: {
      id: 'bonusModal.endAtText',
      defaultMessage: 'This bonus is available until {date}.',
    },
  });

  const dateFormat = DateFormatsByLanguage[locale];

  const handleClaimBonus = async () => {
    try {
      if (!latestActiveBonus) {
        return;
      }
      await claimBonus({ bonusId: latestActiveBonus?.bonus?.id, coin: currency }).unwrap();
      refetchBonus();
      refetchBalances();
      dispatch(setActiveReloadBonus(latestActiveBonus));
      addNotification({
        type: 'success',
        title: <FormattedMessage defaultMessage="Success" id="notification.successTitle" />,
        text: 'Account credited',
      });
      dispatch(toggleVIPModal());
    } catch (ex) {
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

  const isReloadBonusClaimablee = latestActiveBonus && checkIfReloadBonusIsClaimable(latestActiveBonus);

  if (isReloadBonusClaimablee === false) {
    dispatch(setActiveReloadBonus(undefined));
  }

  return (
    <BonusClaimContainer>
      <Box mb="l">
        <Heading align="center" size="h3">
          {latestActiveBonus?.bonus?.name}
        </Heading>
        <Text level="medium">{latestActiveBonus?.bonus?.description}</Text>
      </Box>
      <Box mb="l">
        <Text level="medium">
          <FormattedMessage
            defaultMessage="Select your favourite currency"
            id="bonusModal.selectYourFavouriteCurrency"
          />
        </Text>
      </Box>
      <SelectWrapper>
        <Select
          value={selectOptions.find((el) => el.value === currency)}
          size={SelectSize.Big}
          options={selectOptions}
          onChange={(option) => setCurrency((option as BonusOption).value)}
        />
      </SelectWrapper>
      <StyledButton onClick={handleClaimBonus} disabled={!latestBonus || isLoading || isBonusesFetching}>
        <TextUppercase level="medium">
          <FormattedMessage defaultMessage="Claim" id="bonusModal.button" />
        </TextUppercase>
      </StyledButton>
      <Box mt="l">
        <Text level="medium">
          {intl.formatMessage(messages.endAtText, {
            date: formatDateString(latestActiveBonus?.bonus?.endAt, dateFormat),
          })}
        </Text>
      </Box>
      <Box mb="l">
        {!latestBonus && latestActiveBonus && (
          <div>
            <FormattedMessage defaultMessage="Next claim is available on" id="vipModal.reloadClaimDate" />
            &nbsp;
            {convertDateToString(getNextReloadBonusClaimableDate(latestActiveBonus), dateFormat)}
          </div>
        )}
      </Box>
    </BonusClaimContainer>
  );
};
