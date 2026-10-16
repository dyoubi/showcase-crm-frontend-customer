import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

export const PromoImage = styled.img(({ theme }) => ({
  borderRadius: '4px',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: '320px',
  },
}));
