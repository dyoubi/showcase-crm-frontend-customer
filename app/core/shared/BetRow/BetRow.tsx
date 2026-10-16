import { FC, MouseEventHandler } from 'react';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import { Text } from '@/core/components/Typography';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { CryptoIcon } from '@/core/shared/CryptoIcon';
import { CryptoCodes } from '@/core/domains/currency';
import { DateFormatsByLanguage } from '@/core/constants/constants';
import { useTheme } from '@/core/hooks/useTheme';

import { formatDateString } from '@/utils/date';

import { BetCell, GameCell, MultiplierCell, MultiplierTextContainer, StyledTableRow, Username } from './BetRow.styles';

export interface Props {
  username?: string;
  amountBet?: string | number;
  multiplier?: string | number;
  amountWon?: string | number;
  machineTitle?: string;
  date?: string;
  onRowClick?: () => void;
  onUsernameClick?: () => void;
  coin?: CryptoCodes;
}

export const BetRow: FC<Props> = ({
  username,
  amountBet,
  multiplier,
  amountWon,
  machineTitle,
  date,
  coin,
  onRowClick,
  onUsernameClick,
}) => {
  const { isTabletOrPhone } = useBreakpoints();
  const intl = useIntl();
  const { locale } = intl;
  const { rebrandingColors } = useTheme();

  const TextColors = {
    DarkGray: rebrandingColors.palette.light[40],
    Green: rebrandingColors.palette.green[20],
  };
  const handleUsernameClick: MouseEventHandler<HTMLTableDataCellElement | undefined> = (evt) => {
    if (onUsernameClick) {
      evt.stopPropagation();

      onUsernameClick();
    }
  };

  return (
    <StyledTableRow onClick={onRowClick} isClickable={!!onRowClick}>
      <GameCell align="left">
        <Text level="small" color={TextColors.DarkGray}>
          {machineTitle}
        </Text>
      </GameCell>
      {!isTabletOrPhone && (
        <>
          <td onClick={handleUsernameClick}>
            <Text level="small" color={TextColors.DarkGray}>
              <Username>{username}</Username>
            </Text>
          </td>

          <td onClick={handleUsernameClick}>
            <Text level="small" color={TextColors.DarkGray}>
              <span>{formatDateString(date, DateFormatsByLanguage[locale])}</span>
            </Text>
          </td>

          <BetCell>
            <Text level="small" color={TextColors.DarkGray}>
              <CryptoIcon code={coin} />
              <span>{amountBet}</span>
            </Text>
          </BetCell>
        </>
      )}

      <MultiplierCell>
        <MultiplierTextContainer>
          <Text level="small" color={multiplier ? TextColors.Green : TextColors.DarkGray}>
            <span>{`${multiplier ? BigNumber(multiplier).toFixed(2) : 0}X`}</span>
          </Text>
        </MultiplierTextContainer>
      </MultiplierCell>

      <td align="left">
        <Text level="small" color="darkGray">
          <CryptoIcon code={coin} />
          <span>{amountWon}</span>
        </Text>
      </td>
    </StyledTableRow>
  );
};
