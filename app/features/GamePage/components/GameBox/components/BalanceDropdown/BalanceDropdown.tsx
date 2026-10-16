import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { Dropdown, DropdownItem, DropdownMenu } from '@/core/components/Dropdown';
import { FiatIcon } from '@/core/shared/FiatIcon';
import { selectPlayIn, setPlayIn } from '@/core/store/metaSlice';
import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { EInGameFiatCodes, InGameFiatCodes } from '@/core/domains/currency';

import {
  BalanceBox,
  CurrencyContainer,
  CurrencyText,
  StyledDropdownContainer,
  StyledText,
} from './BalanceDropdown.styles';

export const BalanceDropdown: FC = () => {
  const playIn = useAppSelector(selectPlayIn);
  const dispatch = useAppDispatch();
  const setFiatToPlayIn = (newFiat: InGameFiatCodes) => dispatch(setPlayIn(newFiat));

  return (
    <BalanceBox data-mocked>
      <StyledText level="small">
        <FormattedMessage id="game.balance" defaultMessage="Display balance in " />
      </StyledText>
      <Dropdown
        content={
          <DropdownMenu width={180}>
            {Object.keys(EInGameFiatCodes).map((c) => {
              const fiatCode = c as InGameFiatCodes;

              return (
                <DropdownItem
                  iconLeft={<FiatIcon code={fiatCode} />}
                  key={fiatCode}
                  onClick={() => setFiatToPlayIn(fiatCode)}
                >
                  {EInGameFiatCodes[fiatCode]}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        }
      >
        <StyledDropdownContainer displayArrow>
          <CurrencyContainer>
            <FiatIcon code={playIn} />
            <CurrencyText>{playIn}</CurrencyText>
          </CurrencyContainer>
        </StyledDropdownContainer>
      </Dropdown>
    </BalanceBox>
  );
};
