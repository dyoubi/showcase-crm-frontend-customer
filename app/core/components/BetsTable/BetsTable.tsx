import { FC, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSession } from 'next-auth/react';

import { BetModal } from '@/core/components/BetModal';
import { BetPlayerRow } from '@/core/shared/BetPlayerRow';
import { BetRow } from '@/core/shared/BetRow';
import { GameResponse, useGetBetsQuery } from '@/core/domains/bet';
import { Text } from '@/core/components/Typography';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { convertBetResponseToBet } from '@/core/domains/bet/logic.helper';
import { Table } from '@/core/shared';

import { BetModes, BetTableMode } from './BetsTable.types';
import { EmptyLabelContainer } from './BetsTable.styles';

interface BetsTableProps {
  selectedMode?: BetTableMode;
  userGameActions?: Array<GameResponse>;
}

export const BetsTable: FC<BetsTableProps> = ({ selectedMode, userGameActions }) => {
  const isLogged = useIsLogged();
  const [activeBetModal, setActiveBetModal] = useState<string | null>(null);

  const { isTabletOrPhone } = useBreakpoints();
  const { formatCryptoPrice } = useDisplayPrice();
  const { data: session } = useSession();

  const { data: liveBets } = useGetBetsQuery(
    {
      type: selectedMode || BetModes.MY_BETS,
      accessToken: session?.accessToken,
    },
    { refetchOnMountOrArgChange: true },
  );

  const transformedUserGameActions =
    userGameActions
      ?.flatMap((game: GameResponse) =>
        game?.actions
          ? game.actions.map((action) => ({
              id: game.id,
              actionId: action.id,
              inGameCurrency: game.inGameCurrency,
              balanceCurrency: game.balanceCurrency,
              createdAt: action.operation?.createdAt,
              machineTitle: game.machine?.title,
              data: action.data,
              type: action.type,
              amount: Math.abs(Number(action.operation?.value)).toString(),
              coin: action.operation?.coin,
            }))
          : [],
      )
      .filter((action) => action !== undefined) || [];

  const gameSessionActions = userGameActions ? undefined : liveBets;

  if (!isLogged && selectedMode === BetModes.MY_BETS) {
    return (
      // TODO: Standardize as Card? */}
      <EmptyLabelContainer>
        <FormattedMessage id="betsTable.noLogged" defaultMessage="You must log in to view your bet history." />
      </EmptyLabelContainer>
    );
  }

  if (!gameSessionActions?.length && !transformedUserGameActions?.length) {
    return (
      // TODO: Standardize as Card? */}
      <EmptyLabelContainer>
        <FormattedMessage id="betsTable.empty" defaultMessage="No results for bets history." />
      </EmptyLabelContainer>
    );
  }

  return (
    <>
      {transformedUserGameActions?.length ? (
        <Table>
          <thead>
            <tr>
              <th scope="col" align="left" style={{ paddingLeft: 40 }}>
                <Text level="small">
                  <FormattedMessage id="betsTable.game" defaultMessage="Game" />
                </Text>
              </th>

              {!isTabletOrPhone && (
                <th scope="col" align="center">
                  <Text level="small">
                    <FormattedMessage id="betsTable.date" defaultMessage="Date" />
                  </Text>
                </th>
              )}

              <th scope="col" align="right">
                <Text level="small">
                  <FormattedMessage id="betsTable.amount" defaultMessage="Amount" />
                </Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {transformedUserGameActions.map((game: any) => (
              <BetPlayerRow
                key={game.actionId}
                amount={formatCryptoPrice({
                  amount: game?.amount,
                  cryptoCode: game.balanceCurrency,
                })}
                date={game.createdAt}
                machineTitle={game.machineTitle}
                type={game.type}
                coin={game.coin}
              />
            ))}
          </tbody>
        </Table>
      ) : null}

      {gameSessionActions?.length ? (
        <Table>
          <thead>
            <tr>
              <th align="left">
                <FormattedMessage id="betsTable.game" defaultMessage="Game" />
              </th>

              {!isTabletOrPhone && (
                <>
                  <th align="left" scope="col">
                    <Text level="small">
                      <FormattedMessage id="betsTable.username" defaultMessage="Username" />
                    </Text>
                  </th>

                  <th align="left" scope="col">
                    <Text level="small">
                      <FormattedMessage id="betsTable.date" defaultMessage="Date" />
                    </Text>
                  </th>

                  <th align="left" scope="col">
                    <Text level="small">
                      <FormattedMessage id="betsTable.betAmount" defaultMessage="Bet Amount" />
                    </Text>
                  </th>
                </>
              )}

              <th align="left" scope="col">
                <Text level="small">
                  <FormattedMessage id="betModal.multiplier" defaultMessage="Multiplier" />
                </Text>
              </th>

              <th align="left" scope="col">
                <Text level="small">
                  <FormattedMessage id="betModal.payout" defaultMessage="Payout" />
                </Text>
              </th>
            </tr>
          </thead>

          <tbody>
            {gameSessionActions.map((bet: any) => (
              <BetRow
                key={`${bet?.player?.id}_${bet?.action?.data?.id}`}
                username={bet?.player?.nickname}
                amountBet={formatCryptoPrice({
                  amount: bet?.action?.amount,
                  cryptoCode: bet?.action?.coin,
                  withoutCryptoUnit: true,
                })}
                multiplier={bet?.action?.multiplier}
                amountWon={formatCryptoPrice({
                  amount: bet?.action?.payout,
                  cryptoCode: bet?.action?.coin,
                  withoutCryptoUnit: true,
                })}
                coin={bet?.action?.coin}
                date={bet?.action?.timestamp}
                machineTitle={bet?.machine?.title}
                onRowClick={() => setActiveBetModal(bet?.action.data?.id)}
                onUsernameClick={() => setActiveBetModal(bet?.action.data?.id)}
              />
            ))}
          </tbody>
        </Table>
      ) : null}

      {!!activeBetModal && userGameActions === undefined && (
        <BetModal
          // @ts-ignore
          bet={convertBetResponseToBet(gameSessionActions.find((bet) => bet?.action.data?.id === activeBetModal))}
          isOpen={!!activeBetModal}
          setIsOpen={() => setActiveBetModal(null)}
        />
      )}
    </>
  );
};
