import { memo } from 'react';

import { GamesCarousel } from '@/core/components/GamesCarousel';
import { ContentContainer } from '@/core/components/Layout';
import { ProvidersCarousel } from '@/core/components/ProvidersCarousel';
import { BuiltInCategoriesSlugsEnum } from '@/core/domains/category';
import { FavoriteGamesCarousel } from '@/core/components/FavoriteGamesCarousel';
import { Box } from '@/core/shared/Box';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { SearchBarContainer } from '@/core/components/SearchMachineViewInput/styles';
import { SearchBar } from '@/core/components/SearchBar';

import { HomeSlider } from './components/HomeSlider';
import { useHomePageContext } from './context/HomePageContext';
import { Leaderboard } from './components/Leaderboard';
import { HomePageWidget } from './components/HomePageWidgets/HomePageWidget';
import { WidgetContainer } from './components/HomePageWidgets/HomePageWidgets.styles';
import { CryptoBanner } from './components/CryptoBanner';

export const Homepage = () => {
  const { isTabletOrPhone } = useBreakpoints();
  const isLogged = useIsLogged();
  const MemoizedHomeSlider = memo(HomeSlider);
  const MemoizedFavoriteGamesCarousel = memo(FavoriteGamesCarousel);

  const { ctaArticles } = useHomePageContext();

  return (
    <ContentContainer>
      <Box mt={isTabletOrPhone ? 'xl' : 'm'}>
        <MemoizedHomeSlider />
      </Box>
      {!isTabletOrPhone && (
        <Box mt="m">
          <SearchBarContainer>
            <SearchBar />
          </SearchBarContainer>
        </Box>
      )}
      {!isLogged && (
        <Box mt="m">
          <WidgetContainer>
            {ctaArticles.map((article, indx) => (
              <HomePageWidget key={article.key} article={article} isOdd={indx % 2 === 1} />
            ))}
          </WidgetContainer>
        </Box>
      )}
      {isLogged && <Leaderboard />}
      {!isTabletOrPhone && (
        <>
          {isLogged && (
            <>
              <Box mt="m">
                <MemoizedFavoriteGamesCarousel />
              </Box>
              <Box mt="m">
                <GamesCarousel categorySlug={BuiltInCategoriesSlugsEnum.RECOMMANDED} />
              </Box>
            </>
          )}
          <Box mt="m">
            <GamesCarousel categorySlug={BuiltInCategoriesSlugsEnum.SLOTS} />
          </Box>
          {!isLogged && (
            <Box mt="m">
              <CryptoBanner />
            </Box>
          )}
          <Box mt="m">
            <GamesCarousel categorySlug={BuiltInCategoriesSlugsEnum.LIVE_CASINO} />
          </Box>
        </>
      )}
      {isTabletOrPhone && (
        <>
          <Box mt="m">
            <MemoizedFavoriteGamesCarousel />
          </Box>
          <Box mt="m">
            <GamesCarousel categorySlug={BuiltInCategoriesSlugsEnum.SLOTS} />
          </Box>
          {!isLogged && (
            <Box mt="m">
              <CryptoBanner />
            </Box>
          )}
          <Box mt="m">
            <GamesCarousel categorySlug={BuiltInCategoriesSlugsEnum.RECOMMANDED} />
          </Box>
          <Box mt="m" data-mocked>
            <ProvidersCarousel />
          </Box>
          <Box mt="m">
            <GamesCarousel categorySlug={BuiltInCategoriesSlugsEnum.LIVE_CASINO} />
          </Box>
        </>
      )}
      {/* <Box mt="m">
        <Leaderboard />
      </Box> */}
      {!isTabletOrPhone && (
        <Box mt="m" data-mocked>
          <ProvidersCarousel />
        </Box>
      )}
      <Box mt="m">
        <GamesCarousel categorySlug={BuiltInCategoriesSlugsEnum.NEW} />
      </Box>
      <Box mt="m">
        <GamesCarousel categorySlug={BuiltInCategoriesSlugsEnum.BUY_IN_FEATURE} />
      </Box>

      {/* // TODO @BETS: This will be implemented in a different ticket. */}
      {/* <Box mt="xl">
        <MainPageBets />
      </Box> */}
    </ContentContainer>
  );
};
