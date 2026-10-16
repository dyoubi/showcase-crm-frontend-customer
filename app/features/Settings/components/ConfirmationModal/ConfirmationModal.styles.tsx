import styled from 'styled-components';

import { Button } from '@/core/shared/Button';

import { mq, screen } from '@/libs/media-query/media';

export const ConfirmationButtonContainer = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

export const ConfirmationButton = styled(Button)(({ theme }) => ({
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontSize: 14,
    padding: '20px 74px',
  },
}));
