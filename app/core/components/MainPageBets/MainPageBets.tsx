import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useIsLogged } from '@/core/hooks/useIsLogged';
import { BetsTable } from '@/core/components/BetsTable';
import { BetModes, BetTableMode } from '@/core/components/BetsTable/BetsTable.types';
import { Spacer } from '@/core/shared';
import { Toggle } from '@/core/shared/Toggle/Toggle';

import { Container, EmptyLabelContainer } from './MainPageBets.styles';
import { headerLabels } from './MainPageBets.constants';

export const MainPageBets = () => {
  const [mode, setMode] = useState<BetTableMode>(BetModes.ALL_BETS);
  const isLogged = useIsLogged();
  const { formatMessage } = useIntl();

  const toggleBetModes = (selectedIndex: number) => {
    setMode(selectedIndex === 0 ? BetModes.ALL_BETS : BetModes.MY_BETS);
  };

  return (
    <Container>
      <div>
        <Toggle labels={[formatMessage(headerLabels[0]), formatMessage(headerLabels[1])]} onSelect={toggleBetModes} />
      </div>

      <Spacer size="s" />

      {!isLogged && mode === BetModes.MY_BETS ? (
        // TODO: Standardize as Card */}
        <EmptyLabelContainer>
          <FormattedMessage id="betsTable.noLogged" defaultMessage="You must log in to view your bet history." />
        </EmptyLabelContainer>
      ) : (
        <BetsTable selectedMode={mode} />
      )}
    </Container>
  );
};
