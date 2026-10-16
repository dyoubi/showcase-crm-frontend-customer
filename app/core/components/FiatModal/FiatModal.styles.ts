import styled from 'styled-components';

import { Modal } from '@/core/shared/Modal';

import { mq, screen } from '@/libs/media-query';

export const StyledModal = styled(Modal)(({ theme }) => ({
  maxWidth: 768,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    maxWidth: 'calc(100vw - 16px)',
  },
}));

export const ModalContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '768px',
  maxWidth: '100%',
});

export const RadioWrapper = styled.div({
  marginBottom: '12px',
});

export const Paragraph = styled.p({
  width: '100%',
  fontSize: '14px',
  margin: '0 0 8px',
});
