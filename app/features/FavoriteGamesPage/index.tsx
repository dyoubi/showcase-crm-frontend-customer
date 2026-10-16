import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

import { ContentContainer } from '@/core/components/Layout';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useGetFavoriteMachinesViewQuery } from '@/core/domains/machineView';
import { SearchMachineViewInput } from '@/core/components/SearchMachineViewInput';
import { Box } from '@/core/shared/Box';
// import { MainPageBets } from '@/core/components/MainPageBets';
import { ProvidersCarousel } from '@/core/components/ProvidersCarousel';
import { useMachinesSort } from '@/core/hooks/useMachinesSort';

import { StyledHeading } from './FavoriteGamesPage.styles';
import { GameList } from './components/GameList';

export const FavoriteGamesPage = () => {
  const { formatMessage } = useIntl();
  const { isTabletOrPhone } = useBreakpoints();
  const {
    query: { sortBy },
  } = useRouter();
  const { favoritesMachinesViews } = useGetFavoriteMachinesViewQuery(undefined, {
    selectFromResult: (result) => ({
      favoritesMachinesViews: (result?.data || []).map(({ subject }) => subject),
    }),
  });
  const sortedFavoritesMachinesViews = useMachinesSort(favoritesMachinesViews, sortBy);

  return (
    <ContentContainer>
      <StyledHeading size="h2">
        {formatMessage({
          id: 'favorites',
          defaultMessage: 'Favorites',
        })}
      </StyledHeading>
      {!isTabletOrPhone && <SearchMachineViewInput />}
      <GameList data={sortedFavoritesMachinesViews} />
      <Box data-mocked>
        <ProvidersCarousel />
      </Box>

      {/* // TODO @BETS: This will be implemented in a different ticket. */}
      {/* <Box mt="l">
        <MainPageBets />
      </Box> */}
    </ContentContainer>
  );
};
