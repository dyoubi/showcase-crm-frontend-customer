import styled from 'styled-components';

import { Button } from '@/core/shared/Button';

import { getTypography } from '@/themes/mixins';

import { Modal } from '../../shared/Modal';

import { mq, screen } from '@/libs/media-query';

export const StyledModal = styled(Modal)(({ theme }) => ({
  width: 540,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: '100%',
    margin: 0,
  },
}));

export const TabContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  '>div': {
    width: '100%',
    display: 'flex',
    justifyContent: 'stretch',
  },
});

export const TabButton = styled(Button)({
  textTransform: 'uppercase',
  padding: '8px',
});

export const VIPFooter = styled.p(({ theme }) => ({
  margin: 0,
  ...getTypography(theme.typography.body.small),
  fontWeight: 700,
  textAlign: 'center',
}));
