import styled from 'styled-components';

import { Button } from '@/core/shared/Button';

import { mq, screen } from '@/libs/media-query';

export const StyledButton = styled(Button)(({ theme }) => ({
  width: 160,
  lineHeight: '16px',
  padding: '14.5px 0',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    maxWidth: 120,
    padding: '13px 0',
    fontSize: 12,
  },
}));

export const TopMenuActionsContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flex: 1.5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    justifyContent: 'flex-end',
    gap: 10,
  },

  marginRight: 20,
  svg: {
    display: 'block',
  },
}));

export const PreAuthContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flex: 1.5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 10,
  marginRight: 20,
}));
