import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useDisplayPrice } from '@/core/hooks/useDisplayPrice';
import { ButtonSize } from '@/core/shared/Button/Button.types';

import {
  BetDetailContainer,
  BetValueContainer,
  ContentContainer,
  GameDetailContainer,
  GameHeader,
  GameInformationColumn,
  GameProvider,
  PlayButton,
  StyledIconPlay,
  StyledModal,
  ThumbnailWrapper,
} from './BetModal.styles';
import { BetModalProps } from './BetModal.types';
import { BetValueCard } from './BetValueCard/BetValueCard';
import { BetPlayerInfoCard } from './BetPlayerInfoCard/BetPlayerInfoCard';
import { Thumbnail } from '../Thumbnail/Thumbnail';

export const BetModal: FC<BetModalProps> = ({ bet, isOpen, setIsOpen }) => {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const { formatCryptoPrice } = useDisplayPrice();

  if (!bet) {
    return null;
  }

  const formattedWin = formatCryptoPrice({
    amount: bet.payout,
    cryptoCode: bet.coin,
  });

  const formattedBet = formatCryptoPrice({
    amount: bet.bet,
    cryptoCode: bet.coin,
  });
  const multiplier = bet.multiplier.toFixed(2);
  const betValues = [
    {
      title: formatMessage({ id: 'betModal.bet', defaultMessage: 'Bet' }),
      value: formattedBet,
      hasHighlight: false,
      cryptoSymbol: bet.coin,
    },
    {
      title: formatMessage({ id: 'betModal.multiplier', defaultMessage: 'Multiplier' }),
      value: multiplier,
      hasHighlight: true,
    },
    {
      title: formatMessage({ id: 'betModal.payout', defaultMessage: 'Payout' }),
      value: formattedWin,
      hasHighlight: true,
      cryptoSymbol: bet.coin,
    },
  ];

  return (
    <StyledModal
      header={formatMessage({
        id: 'betModal.header',
        defaultMessage: 'Bet Details',
      })}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="bet-modal"
    >
      <ContentContainer>
        <GameDetailContainer>
          <ThumbnailWrapper>
            <Thumbnail
              disableHover
              title={bet.machine.title}
              slug={bet.machine.slug}
              src={{
                desktop: '/images/example-thumbnail.png',
                mobile: '/images/example-thumbnail.png',
              }}
            />
          </ThumbnailWrapper>
          <GameInformationColumn>
            <GameHeader>
              <span>{`${bet.machine.title}`}</span>
              <GameProvider>Ygg Drasil</GameProvider>
              {/**
        <BetId>
           * TODO: add external id, not included in current BetResponse
        </BetId>
           */}
            </GameHeader>
            <PlayButton
              onClick={() => router.push(`/game/${bet.machine.slug}`)}
              size={ButtonSize.Block}
              iconLeft={<StyledIconPlay />}
            >
              <FormattedMessage id="betModal.playGameGeneric" defaultMessage="Play Game" />
            </PlayButton>
          </GameInformationColumn>
        </GameDetailContainer>
        <BetDetailContainer>
          <BetPlayerInfoCard date={bet.date} username={bet.username} />
          <BetValueContainer>
            {betValues.map((betValueObject, index) => (
              <BetValueCard
                // until getting id from endpoints
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={betValueObject.title}
                value={betValueObject.value}
                hasHighlight={betValueObject.hasHighlight}
                cryptoCode={betValueObject?.cryptoSymbol}
              />
            ))}
          </BetValueContainer>
        </BetDetailContainer>
      </ContentContainer>
    </StyledModal>
  );
};
