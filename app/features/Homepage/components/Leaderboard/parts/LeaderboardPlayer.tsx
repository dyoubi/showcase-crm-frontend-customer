import { FormattedMessage, useIntl } from 'react-intl';

import {
  FlexContainer,
  Multiplier,
  Nickname,
  PlayerRow,
  RankCircle,
  Row,
  StyledHeading,
  TableHeader,
  UserInfo,
  WidgetBorder,
  WidgetContainer,
} from '../Leaderboard.styles';
import { BoardProps } from '../Leaderboard.types';
import playerData from './playersdata.json';

export const LeaderboardPlayer = ({ switchBoard }: BoardProps) => {
  const { formatNumber, formatMessage } = useIntl();
  const day = new Date().getDay();
  const players = playerData.days[day];

  return (
    <WidgetBorder>
      <WidgetContainer>
        <FlexContainer justify="flex-start">
          <StyledHeading size="h4">
            <FormattedMessage id="leaderboard.player" defaultMessage="Leaderboard Player" />
          </StyledHeading>
        </FlexContainer>
        <TableHeader>
          <span>{formatMessage({ id: 'leaderboard.rank', defaultMessage: 'Rank' })}</span>
          <span>{formatMessage({ id: 'leaderboard.user', defaultMessage: 'User' })}</span>
          <span>{formatMessage({ id: 'leaderboard.multiplier', defaultMessage: 'Multiplier' })}</span>
        </TableHeader>
        {players?.map((item, index) => (
          <PlayerRow key={`${item?.id}_${item?.position}`} isTopPlayer={index === 0}>
            <RankCircle rank={index}>{item?.position}</RankCircle>
            <UserInfo>
              {/* <Avatar src={item?.member?.avatar} alt={item?.member?.nickname} /> */}
              <Nickname>{item?.member?.nickname}</Nickname>
            </UserInfo>
            <Multiplier rank={index}>
              {formatNumber(item?.score || 0, {
                maximumFractionDigits: 1,
                minimumFractionDigits: 1,
              })}
              x
            </Multiplier>
          </PlayerRow>
        ))}
      </WidgetContainer>
    </WidgetBorder>
  );
};
