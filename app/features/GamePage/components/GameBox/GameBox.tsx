import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';

import { GameDescription } from '@/core/components/GameDescription';
import { routePaths } from '@/core/constants/routes';
import { GameMode, selectGameMode, selectInGame, setInGame, useGetMachineViewQuery } from '@/core/domains/machineView';
import { useAppCookies } from '@/core/hooks/useAppCookies';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { Box } from '@/core/shared/Box';
import { useAppDispatch, useAppSelector } from '@/core/store/store';

import { gameContainerId } from '../../constants';
import { useRunGame } from '../../hooks/useRunGame';
import { GameFooter } from '../GameFooter';
import { GameBoxContainer, GameContainer, GameDescriptionFooter, GameRunner, MainContainer } from './GameBox.styles';
import { GamePlaceholder } from './components/GamePlaceholder/GamePlaceholder';

export const GameBox: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { slug } = router.query;

  const { data: gameDetails } = useGetMachineViewQuery({ slug: slug as string });

  // const rtp = gameDetails ? parseFloat(gameDetails?.machine?.payout) : 0;
  const rtp = gameDetails?.rtp ? gameDetails?.rtp : 0; // TODO check with backend's team for have the association between an machineView & machine
  const tags = gameDetails?.tags?.length ? gameDetails?.tags : [];
  const isInGame = useAppSelector(selectInGame);
  const gameMode = useAppSelector(selectGameMode);

  const [isWideScreen, setWideScreen] = useState<boolean>(false);

  const { isTabletOrPhone } = useBreakpoints();
  const { runGame, stopGame, isLoading, isSuccess } = useRunGame();

  useEffect(() => {
    if (slug) {
      /**
       * CBP-32
       * This allows the GamePlaceholder to be shown when the slug changes (the user navigates to a different game)
       */
      dispatch(setInGame(false));
    }
  }, [slug, dispatch]);

  const { cookies } = useAppCookies();
  const { locale } = router;

  const toggleFullScreen = useCallback(() => {
    const iframe = document.getElementById(gameContainerId)?.querySelector('iframe');

    if (iframe) {
      iframe.requestFullscreen();
    }
  }, []);

  const toggleWideScreen = useCallback(() => {
    setWideScreen(!isWideScreen);
  }, [isWideScreen]);

  const goHomePage = useCallback(() => {
    router.push(routePaths.home);
  }, [router]);

  const togglePlaymode = useCallback(() => {
    stopGame();
    const newGameMode = gameMode === GameMode.Real ? GameMode.Fun : GameMode.Real;

    if (!gameDetails?.key || !locale) {
      return;
    }

    runGame({
      game: gameDetails?.key,
      balance: cookies?.activeBalance || '',
      locale,
      clientType: 'desktop',
      demo: newGameMode === GameMode.Fun,
    });
  }, [gameMode, stopGame, runGame, gameDetails, cookies.activeBalance, locale]);

  return (
    <MainContainer>
      <GameBoxContainer isWideScreen={isWideScreen} isInGame={isInGame}>
        <GameContainer>
          {/**
           * CBP-32
           * The key will force a rerender of the game runner when the slug changes (the user navigates to a different game)
           */}
          <GameRunner isLoaded={isInGame} key={slug as string} />
          {!isInGame && (
            <GamePlaceholder
              isLoading={isLoading}
              gameDetails={gameDetails}
              runGame={runGame}
              imagePath={gameDetails?.image?.desktop?.url || ''}
              provider={gameDetails?.provider || ''}
              rating={`Edge : ${(100 - rtp).toFixed(2)}%`}
              tags={tags}
              title={gameDetails?.title || ''}
            />
          )}
        </GameContainer>
        {/* Game agregator requires element with gameContainerId to run.
             Even thought mobile resolution doesn't include canvas with game */}
        {isTabletOrPhone && <div id={gameContainerId} style={{ display: 'none' }} />}
      </GameBoxContainer>
      <Box mb="m">
        <GameFooter
          onFullScreenClick={toggleFullScreen}
          onWideScreen={toggleWideScreen}
          onHomeClick={goHomePage}
          gameDetails={gameDetails}
          onPlaymodeToggle={togglePlaymode}
        />
      </Box>
      <GameDescription description={gameDetails?.description || ''} />
    </MainContainer>
  );
};
