import styled from 'styled-components';

import { Menu, MenuItem } from '../Menu';

import { mq, screen } from '@/libs/media-query';

export const LateralMenuWrapper = styled.div(({ theme }) => ({
  width: 70,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11,
    width: '100%',
    padding: 0,
    background: 'rgba(21, 15, 48, 0.7)',
    height: '100vh',
    '@supports (height: 100dvh)': {
      height: '100dvh',
    },
  },
}));

export const LateralMenuContainer = styled.div(({ theme }) => ({
  width: '100%',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
    zIndex: 11,
    width: '70%',
    maxWidth: 400,
    minWidth: 200,
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: '100%',
    background: theme.rebrandingColors.palette.dark[80],
  },
}));

export const StyledLateralMenu = styled(Menu)(({ theme }) => ({
  position: 'relative',
  width: 246,
  minHeight: 720,
  height: '100vh',
  padding: '110px 10px 0px',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'block',
    width: 'inherit',
    height: '100%',
    background: theme.rebrandingColors.palette.dark[80],
  },

  svg: {
    minWidth: 24,
    marginRight: 24,
  },

  '.lateral-menu__arrow': {
    justifyContent: 'center',

    svg: {
      marginRight: 0,
    },
  },

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    top: 28,
    overflow: 'hidden',
    width: '100%',
    height: 'unset',
    minHeight: 'unset',
    padding: '0 10px',
    transition: 'none',

    '&::before': {
      display: 'none',
    },

    '&:hover': {
      width: '100%',

      svg: {
        marginRight: 24,
      },
    },
    svg: {
      transition: 'none',
    },
  },
}));

export const LateralMenuArrow = styled.div({
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  padding: '22px 12px',
  width: '100%',
});

export const LateralMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  border: 'none',
  fontWeight: theme.typography.headline.fontWeight,
  borderRadius: 6,
  '> *': {
    padding: 0,
    whiteSpace: 'nowrap',
  },
}));

export const MenuItemContainer = styled.div<{ active: boolean }>(({ theme, active }) => ({
  display: 'flex',
  padding: '8px 8px',
  position: 'relative',
  color: theme.rebrandingColors.palette.light[40],
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    padding: '12px 0 12px 12px',
  },

  ...(active && {
    color: theme.rebrandingColors.palette.light[20],
    '&::before': {
      content: '""',
      position: 'absolute',
      left: '0px',
      top: '0px',
      bottom: '0px',
      width: '25px',
      borderRadius: '0px 4px 4px 0px',
      background: 'linear-gradient(90deg,rgba(0, 102, 254, 0.27) 10%,rgba(0, 208, 255, 0) 100%)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: '0px',
      top: '0px',
      bottom: '0px',
      width: '6px',
      borderRadius: '0px 6px 6px 0px',
      background: theme.rebrandingColors.palette.blue[20],
    },

    [`& ${MenuIcon}`]: {
      color: theme.rebrandingColors.palette.blue[20],
    },
  }),
  '&:hover': {
    [`& ${MenuIcon}`]: {
      color: theme.rebrandingColors.palette.blue[20],
    },
  },
}));

export const LateralMenuAccessoryItem = styled(LateralMenuItem)(() => ({
  pointerEvents: 'none',
  '&:hover': {
    background: 'transparent',
  },
}));

export const CloseButton = styled.button.attrs({ type: 'button' })(({ theme }) => ({
  position: 'fixed',
  top: 6,
  right: 6,
  display: 'none',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  zIndex: 1,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    display: 'block',
  },
}));

export const MenuIcon = styled.div(({ theme }) => ({
  width: 18,
  height: 18,
  marginRight: '18px',
  alignSelf: 'center',
  color: theme.rebrandingColors.palette.light[40],
}));

export const ExpandedMenuContainer = styled.div<{ isExpanded: boolean }>(({ isExpanded }) => ({
  maxHeight: isExpanded ? '1000px' : '0',
  overflow: 'hidden',
  opacity: isExpanded ? 1 : 0,
  transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
}));
