import styled from 'styled-components';

import { IconHeart } from '@/core/shared/Icons';

import { mq, screen } from '@/libs/media-query';

export const StyledIconHeart = styled(IconHeart)(({ theme }) => ({
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    svg: {
      width: 24,
      height: 24,
    },
  },
}));
