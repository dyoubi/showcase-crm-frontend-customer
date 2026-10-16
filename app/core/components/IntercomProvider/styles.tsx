import styled from 'styled-components';

import { IconButton } from '@/core/shared/Button/IconButton';

import { mq, screen } from '@/libs/media-query';

export const CustomChatIcon = styled(IconButton)(({ theme }) => ({
  right: '20px',
  bottom: '20px',
  fill: 'white',
  position: 'fixed',
  padding: '12px 10px 12px 12px',
  zIndex: theme.zIndexes.modal + 1,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    bottom: '72px',
    right: '0px',
    borderRadius: '6px',
    padding: '13px 2px 13px 6px',
  },
}));
