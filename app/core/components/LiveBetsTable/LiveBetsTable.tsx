// this component is for backup future usage, is getting data from cached values
import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'next-auth/react';

import { BetModal } from '@/core/components/BetModal';
import { useGetBetsQuery } from '@/core/domains/bet';
import { useBet } from '@/core/domains/bet/hooks';
import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { BetRow } from '@/core/shared/BetRow';
import { toggleUserProfileModal } from '@/core/store/metaSlice';
import { useAppDispatch } from '@/core/store/store';

import { EmptyLabelContainer, StyledTable, TableContainer } from './LiveBetsTable.styles';
import { BetModes, BetTableMode } from './LiveBetsTable.types';

interface LiveBetsTableProps {
  selectedMode?: BetTableMode;
}

export const LiveBetsTable: FC<LiveBetsTableProps> = ({ selectedMode }) => {
  const dispatch = useAppDispatch();
  const isLogged = useIsLogged();
  const [activeBetModal, setActiveBetModal] = useState<string | null>(null);

  const { formatCryptoPrice } = useDisplayPrice();
  const { data: session } = useSession();

  const { data: bets } = useGetBetsQuery(
    {
      type: selectedMode || BetModes.MY_BETS,
      accessToken: session?.accessToken,
    },
    { refetchOnMountOrArgChange: true },
  );
  const { convertBetResponseToBet } = useBet();

  if (!isLogged && selectedMode === BetModes.MY_BETS) {
    return (
      // TODO: Standardize as Card
      <EmptyLabelContainer>
        <FormattedMessage id="betsTable.noLogged" defaultMessage="You must log in to view your bet history." />
      </EmptyLabelContainer>
    );
  }

  return (
    <>
      <TableContainer>
        {!bets?.length ? (
          // TODO: Standardize as Card
          <EmptyLabelContainer>
            <FormattedMessage id="betsTable.empty" defaultMessage="No results for bets history." />
          </EmptyLabelContainer>
        ) : null}

        {bets?.length ? (
          // TODO Standardize Table usage
          <StyledTable>
            <tbody>
              {bets?.map((bet: any) => (
                <BetRow
                  key={`${bet?.player?.id}_${bet?.action?.data?.id}`}
                  username={bet?.player?.nickname}
                  amountBet={formatCryptoPrice({
                    amount: bet?.action?.amount,
                    cryptoCode: bet?.action?.coin,
                  })}
                  multiplier={bet?.action?.multiplier}
                  amountWon={formatCryptoPrice({
                    amount: bet?.action?.payout,
                    cryptoCode: bet?.action?.coin,
                  })}
                  coin={bet?.action?.coin}
                  date={bet?.action?.timestamp}
                  machineTitle={bet?.machine?.title}
                  onRowClick={() => setActiveBetModal(bet?.action.data?.id)}
                  onUsernameClick={() => dispatch(toggleUserProfileModal())}
                />
              ))}
            </tbody>
          </StyledTable>
        ) : null}
      </TableContainer>

      {!!activeBetModal && (
        <BetModal
          // @ts-ignore
          bet={convertBetResponseToBet(bets.find((bet) => bet?.action.data?.id === activeBetModal))}
          isOpen={!!activeBetModal}
          setIsOpen={() => setActiveBetModal(null)}
        />
      )}
    </>
  );
};
