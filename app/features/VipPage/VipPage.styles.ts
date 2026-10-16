import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

export const VipPageImageContainer = styled.div(({ theme }) => ({
  display: 'block',
  overflow: 'hidden',
  maxHeight: 'unset',
  marginBottom: theme.margin.xxs,
  position: 'relative',
  backgroundImage: 'url(/images/banners/vip-desktop.png)',
  minHeight: 360,
  backgroundRepeat: 'no-repeat',

  backgroundPosition: 'center bottom',
  backgroundSize: 'cover',

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    marginTop: theme.margin.l,
    backgroundImage: 'url(/images/banners/vip-mobile.png)',
    backgroundPosition: 'center center',
    minHeight: 480,
  },
  '.banner-overlay-text': {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    textAlign: 'center',
    bottom: 30,
    top: 'unset',

    h1: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: '40px',
    },

    [`${mq.with({ theme }).until(screen.LG)}`]: {
      top: 30,
      bottom: 'unset',
    },
  },
}));
