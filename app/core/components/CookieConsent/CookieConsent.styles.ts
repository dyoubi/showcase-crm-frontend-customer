import styled from 'styled-components';

import { Button } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

export const StyledCookieConsent = styled.div(({ theme }) => ({
  position: 'fixed',
  bottom: 16,
  left: 16,
  width: 'calc(100% - 32px)',
  zIndex: 10000,
  borderRadius: 6,
  '> div': {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 24px 24px 160px',

    background: theme.rebrandingColors.backgroundColor,
    borderRadius: 6,

    textAlign: 'left',
    boxShadow: `0px 4px 8px ${theme.rebrandingColors.palette.dark[10]}`,
    h1: {
      fontSize: theme.typography.body.medium.fontSize,
    },
    img: {
      position: 'absolute',
      left: '0',
      bottom: '0',
      width: 180,
      height: 'auto',

      borderRadius: '0 0 0 16px',
    },
    '.buttonsSection': {
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 6,
    },
    [`${mq.with({ theme }).until(screen.LG)}`]: {
      flexDirection: 'column',
      padding: '12px 12px 12px 100px',
      fontSize: theme.typography.body.small.fontSize,
      '.buttonsSection': {
        width: 'calc(100vw - 112px)',
        columnGap: '6px',
        gridTemplateColumns: '50% 1fr',
        marginLeft: '-60px',
      },
      img: {
        width: 120,
        top: '-32px',
        left: 0,
      },
    },
  },
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: 'calc(100% - 32px)',
    background: theme.rebrandingColors.gradients.blue,
    padding: 1,
  },
}));

export const StyledAcceptButton = styled(Button)(({ theme }) => ({
  color: theme.rebrandingColors.palette.dark[10],
  padding: '16px 34px',
  '&:hover': {
    color: theme.rebrandingColors.palette.dark[20],
  },
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    padding: '16px 12px',
  },
}));

export const StyledMoreButton = styled(Button)(({ theme }) => ({
  padding: '16px 34px',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    padding: '16px 12px',
  },
}));
