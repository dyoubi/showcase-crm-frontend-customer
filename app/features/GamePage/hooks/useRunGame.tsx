import { useEffect } from 'react';
import { useIntl } from 'react-intl';

import { ERRORS_NAMES } from '@/core/domains/api';
import {
  GameMode,
  PlayPayloadSlice,
  resetGame,
  selectGameMode,
  selectInGame,
  setGameMode,
  setInGame,
  usePlayMutation,
} from '@/core/domains/machineView';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { isApiSliceFetchError } from '@/core/store/apiSlice';
import { setIsIncompleteProfileModalOpen } from '@/core/store/metaSlice';
import { useAppDispatch, useAppSelector } from '@/core/store/store';

import { useNotification } from '@/utils/notifications/notification-context';

import { gameContainerId } from '../constants';

// actions responsible for initializing game

export const useRunGame = () => {
  const dispatch = useAppDispatch();
  const { isTabletOrPhone } = useBreakpoints();
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  const isInGame = useAppSelector(selectInGame);
  const isFunMode = useAppSelector(selectGameMode) === GameMode.Fun;

  const [playGame, { data: gameDetails, isLoading, isSuccess, error }] = usePlayMutation();

  const runGame = async (options: PlayPayloadSlice) => {
    dispatch(setGameMode(options.demo ? GameMode.Fun : GameMode.Real));
    await playGame(options);
  };

  const stopGame = () => {
    const gameContainer = document.getElementById(gameContainerId);

    if (gameContainer) {
      gameContainer.innerHTML = '';
    }

    dispatch(setInGame(false));
  };

  const onSuccess = () => {
    dispatch(setInGame(true));
  };

  const onError = (errorMsg: string) => {
    addNotification({
      text: errorMsg,
      type: 'warning',
      title: formatMessage({ id: 'runGame.errorTitle', defaultMessage: 'Warning' }),
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetGame());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && gameDetails) {
      const { game_url } = gameDetails.launch_options;
      const gameLaunchOptions: GameLaunchOptions = {
        target_element: gameContainerId,
        launch_options: {
          game_url,
          strategy: isTabletOrPhone ? 'redirect' : 'detect',
        },
      };

      if (!isInGame) {
        window.sg.launch(gameLaunchOptions, onSuccess, onError);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, gameDetails]);

  useEffect(() => {
    const gameContainer = document.getElementById(gameContainerId);

    if (!isInGame && gameContainer) {
      gameContainer.innerHTML = '';
    }
  }, [isInGame]);

  useEffect(() => {
    if (!error || !isApiSliceFetchError(error)) {
      return;
    }

    if (error?.name === ERRORS_NAMES.PRECONDITION_FAILED_ERROR) {
      dispatch(setIsIncompleteProfileModalOpen(true));

      return;
    }

    if (isFunMode) {
      onError(
        formatMessage({
          id: 'runGame.gameDemoErrorMessage',
          defaultMessage: 'Demo Mode is not available for this game.',
        }),
      );
    } else {
      onError(
        formatMessage({
          id: 'runGame.errorMessage',
          defaultMessage: 'This machine is not available in your location.',
        }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return {
    runGame,
    stopGame,
    isLoading,
    isSuccess,
  };
};
