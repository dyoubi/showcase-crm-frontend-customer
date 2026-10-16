import { FormattedMessage } from 'react-intl';

import { routePaths } from '@/core/constants/routes';

import { StyledText } from './MenuButtonGroup.styles';

export const categoryButtonsByLabelAndLink = [
  {
    link: routePaths.casino,
    label: (
      <StyledText level="small">
        <FormattedMessage id="all" defaultMessage="All" />
      </StyledText>
    ),
  },
  {
    link: `${routePaths.category}/new`,
    label: (
      <StyledText level="small">
        <FormattedMessage id="newReleases" defaultMessage="New Games" />
      </StyledText>
    ),
  },
  {
    link: `${routePaths.category}/slots`,
    label: (
      <StyledText level="small">
        <FormattedMessage id="slotsGames" defaultMessage="Slots Games" />
      </StyledText>
    ),
  },
  {
    link: `${routePaths.category}/livecasino`,
    label: (
      <StyledText level="small">
        <FormattedMessage id="liveCasino" defaultMessage="Live Casino" />
      </StyledText>
    ),
  },
  {
    link: `${routePaths.category}/buyinfeature`,
    label: (
      <StyledText level="small">
        <FormattedMessage id="featuresBuyIn" defaultMessage="Bonus Buy" />
      </StyledText>
    ),
  },
  {
    link: `${routePaths.category}/gameshow`,
    label: (
      <StyledText level="small">
        <FormattedMessage id="gamesShow" defaultMessage="Game Shows" />
      </StyledText>
    ),
  },
];
