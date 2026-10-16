import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

export const BottomMenuContainer = styled.nav(({ theme }) => ({
  display: 'none',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    zIndex: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: '55px',
    background: theme.rebrandingColors.backgroundColor,
    paddingTop: '7px',
  },
}));

export const BottomMenuItem = styled.p(({ theme }) => ({
  '&, a': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: theme.rebrandingColors.palette.light[60],
    textDecoration: 'none',
    fontSize: theme.typography.body.small.fontSize,
    padding: '5px 0',
  },
}));
