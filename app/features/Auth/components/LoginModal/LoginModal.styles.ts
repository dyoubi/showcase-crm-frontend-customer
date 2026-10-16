import styled from 'styled-components';

import { Modal } from '@/core/shared/Modal';

export const StyledModal = styled(Modal)(({ theme }) => ({
  maxWidth: 480,
}));

export const TabContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'start',
}));
