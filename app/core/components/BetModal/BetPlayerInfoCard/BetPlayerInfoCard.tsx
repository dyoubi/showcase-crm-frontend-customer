import { FC } from 'react';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';

import { Card, Detail, DetailContainer, Username } from './BetPlayerInfoCard.styles';
import { BetPlayerInfoCardProps } from './BetPlayerInfoCard.types';

export const BetPlayerInfoCard: FC<BetPlayerInfoCardProps> = ({ username, betId, date }) => {
  return (
    <Card>
      <Username>{username}</Username>
      <DetailContainer>
        <span>
          <FormattedMessage id="betsTable.date" defaultMessage="Date" />:
        </span>
        <Detail>
          <FormattedDate value={date} />, <FormattedTime value={date} />
        </Detail>
      </DetailContainer>
      <DetailContainer>
        <span>
          <FormattedMessage id="betModal.betId" defaultMessage="Bet ID" />:
        </span>
        <Detail>{betId}</Detail>
      </DetailContainer>
    </Card>
  );
};
