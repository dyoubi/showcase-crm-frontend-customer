import styled from 'styled-components';

import { IconInput } from '@/core/shared/Input';

import { mq, screen } from '@/libs/media-query';

export const SearchContainer = styled.div(({ theme }) => ({
  position: 'relative',
  width: '100%',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    p: {
      fontSize: 16,
    },
    maxWidth: '90vw',
  },
}));

export const StyledSearchBar = styled(IconInput)<{ isListVisible: boolean }>(({ theme, isListVisible }) => ({
  padding: '8px 8px 4px 48px',
  outline: 'none',
  background: theme.rebrandingColors.gradients.blue,
  border: '2px solid transparent',
  backgroundOrigin: 'border-box',
  backgroundClip: 'border-box',
  boxShadow: `0px 0px 8px ${theme.rebrandingColors.palette.blue[20]}, inset 0 0 0 1000px ${theme.rebrandingColors.palette.dark[80]};`,
  '&:focus': {
    boxShadow: `0px 0px 8px ${theme.rebrandingColors.palette.blue[20]}, inset 0 0 0 1000px ${theme.rebrandingColors.palette.dark[80]};`,
  },
  fontSize: theme.typography.body.medium,
}));

export const ResultContainer = styled.div(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  boxShadow: `0px 0px 8px ${theme.rebrandingColors.palette.blue[20]}`,
  border: `2px solid ${theme.rebrandingColors.palette.blue[20]}`,
  marginTop: '15px',
  borderRadius: 6,
  width: '100%',
  padding: theme.padding.xxs,
  background: theme.rebrandingColors.palette.dark[80],
  // boxShadow: '0px 1px 5px 1px rgb(0 0 0 / 50%)',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    position: 'unset',
  },
}));

export const StatusBox = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.padding.l,
  p: {
    fontSize: 20,
  },
}));
