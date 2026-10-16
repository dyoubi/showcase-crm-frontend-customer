import { FormattedMessage } from 'react-intl';

import { Text } from '@/core/components/Typography';

import { SelectOption } from './Account.styles';
import { BetLimitCurrencyOptions, PeriodOptions, Periods } from './Account.types';

export const betLimitCurrencyOptions: Array<BetLimitCurrencyOptions> = [
  {
    label: (
      <SelectOption>
        <Text level="medium">
          <FormattedMessage id="account.betLimitCurrencyOptions.euro" defaultMessage="EUR" />
        </Text>
      </SelectOption>
    ),
    value: 'EUR',
  },
  {
    label: (
      <SelectOption>
        <Text level="medium">
          <FormattedMessage id="account.betLimitCurrencyOptions.dollars" defaultMessage="USD" />
        </Text>
      </SelectOption>
    ),
    value: 'USD',
  },
];

export const periodOptions: Array<PeriodOptions> = [
  {
    label: (
      <SelectOption>
        <Text level="medium">
          <FormattedMessage id="account.limitDurationOptions.oneDay" defaultMessage="24 hours" />
        </Text>
      </SelectOption>
    ),
    value: Periods.DAILY,
  },
  {
    label: (
      <SelectOption>
        <Text level="medium">
          <FormattedMessage id="account.limitDurationOptions.sevenDays" defaultMessage="7 days" />
        </Text>
      </SelectOption>
    ),
    value: Periods.WEEKLY,
  },
  {
    label: (
      <SelectOption>
        <Text level="medium">
          <FormattedMessage id="account.limitDurationOptions.oneMonth" defaultMessage="1 month" />
        </Text>
      </SelectOption>
    ),
    value: Periods.MONTHLY,
  },
  {
    label: (
      <SelectOption>
        <Text level="medium">
          <FormattedMessage id="account.limitDurationOptions.threeMonths" defaultMessage="3 months" />
        </Text>
      </SelectOption>
    ),
    value: Periods.MONTHLY_THREE,
  },
];
