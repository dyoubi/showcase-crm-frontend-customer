import { FormattedMessage } from 'react-intl';

import { routePaths } from '@/core/constants/routes';

import { StyledText } from './CategoryPage.styles';

export const categoryList = [
  {
    path: routePaths.casino,
    title: (
      <StyledText level="small">
        <FormattedMessage id="all" defaultMessage="All" />
      </StyledText>
    ),
  },
  {
    path: `${routePaths.category}/new`,
    title: (
      <StyledText level="small">
        <FormattedMessage id="newReleases" defaultMessage="New Games" />
      </StyledText>
    ),
  },
  {
    path: `${routePaths.category}/slots`,
    title: (
      <StyledText level="small">
        <FormattedMessage id="slotsGames" defaultMessage="Slots Games" />
      </StyledText>
    ),
  },
  {
    path: `${routePaths.category}/livecasino`,
    title: (
      <StyledText level="small">
        <FormattedMessage id="liveCasino" defaultMessage="Live Casino" />
      </StyledText>
    ),
  },
  {
    path: `${routePaths.category}/buyinfeature`,
    title: (
      <StyledText level="small">
        <FormattedMessage id="featuresBuyIn" defaultMessage="Bonus Buy" />
      </StyledText>
    ),
  },
  {
    path: `${routePaths.category}/gameshow`,
    title: (
      <StyledText level="small">
        <FormattedMessage id="gamesShow" defaultMessage="Game Shows" />
      </StyledText>
    ),
  },
];
