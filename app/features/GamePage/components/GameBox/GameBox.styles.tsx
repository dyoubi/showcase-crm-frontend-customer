import styled from 'styled-components';

import { Flex } from '@/core/shared';

import { gameContainerId } from '../../constants';

export const GameBoxContainer = styled.div<{ isWideScreen: boolean; isInGame: boolean }>(
  ({ theme, isWideScreen, isInGame }) => ({
    width: '100%',
    maxWidth: 1175,
    ...(isInGame && {
      height: 650,
    }),
    margin: '0 auto',

    ...(isWideScreen
      ? {
          maxWidth: 'none',
          height: 966,
          margin: '0 auto',
        }
      : {}),
  }),
);

export const GameContainer = styled.div(({ theme }) => ({
  height: '100%',
  paddingBottom: theme.padding.l,
}));

export const GameRunner = styled.div.attrs({ id: gameContainerId })<{ isLoaded: boolean }>(({ isLoaded }) => ({
  display: isLoaded ? 'block' : 'none',
  height: '100%',

  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
}));

export const GameDescriptionFooter = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.margin.l,
}));

export const MainContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
}));
