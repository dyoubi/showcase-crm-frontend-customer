import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

export const CategoryPromotionBoxWrapper = styled.div({
  cursor: 'default',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',

  '&:hover': {
    transform: 'translateY(-2px)',
  },
});

export const CategoryPromotionImage = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '10px',

  img: {
    borderRadius: '10px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    transition: 'opacity 0.3s ease-in-out',
  },
}));
