import { FC } from 'react';
import { useIntl } from 'react-intl';

import { IconDice2 } from '@/core/shared/Icons';
import { Text } from '@/core/components/Typography';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { BetType } from '@/core/domains/bet';
import { CryptoCodes } from '@/core/domains/currency/types';
import { DateFormatsByLanguage } from '@/core/constants/constants';
import { useTheme } from '@/core/hooks/useTheme';

import { formatDateString } from '@/utils/date';

import { BetCell, CurrencyCell, TypeCell } from './BetPlayerRow.styles';
import { CryptoIcon } from '../CryptoIcon/CryptoIcon';

export interface Props {
  type?: BetType;
  amount?: string | number;
  machineTitle?: string;
  date?: string;
  coin?: CryptoCodes;
}

export const BetPlayerRow: FC<Props> = ({ type, amount, machineTitle, date, coin }) => {
  const { isTabletOrPhone } = useBreakpoints();
  const isWin = type === 'win';
  const intl = useIntl();
  const { locale } = intl;
  const { theme } = useTheme();

  const TextColors = {
    Green: theme?.rebrandingColors?.palette?.green[20] || '#00FF00',
  };

  return (
    <tr>
      <td>
        <div>
          <span data-mocked>
            <IconDice2 size={16} />
          </span>

          {machineTitle}
        </div>
      </td>

      {!isTabletOrPhone ? <td>{formatDateString(date, DateFormatsByLanguage[locale])}</td> : null}

      <BetCell>
        <Text level="small" color={isWin ? TextColors.Green : undefined} type="subtle">
          {amount}
        </Text>
      </BetCell>

      <CurrencyCell>
        <CryptoIcon code={coin} />
      </CurrencyCell>

      <TypeCell align="right">
        <Text level="small" color={isWin ? TextColors.Green : undefined}>
          {type}
        </Text>
      </TypeCell>
    </tr>
  );
};
