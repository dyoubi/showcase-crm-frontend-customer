import styled, { createGlobalStyle } from 'styled-components';

import { Heading } from '../../components/Typography';
import { ModalHeaderProps, ModalStyleProps, OverlayStyle } from './Modal.types';
import { Flex } from '../Flex';

import { mq, screen } from '@/libs/media-query';

export const GlobalStyles = createGlobalStyle({
  body: { overflow: 'hidden' },
});

export const StyledOverlay = styled.div<{ overlayStyle?: OverlayStyle; isOpen?: boolean }>(
  ({ theme, overlayStyle, isOpen }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: theme.zIndexes.modal,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    background: `${theme.rebrandingColors.colorsToBeDeprecated.dark[100]}CC`,
    transition: 'opacity 0.33s ease',

    ...(overlayStyle === OverlayStyle.Blur
      ? {
          backdropFilter: 'blur(6px)',
        }
      : {}),

    ...(isOpen
      ? {
          opacity: 1,
        }
      : {
          opacity: 0,
        }),
  }),
);

export const ModalWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '100%',
});

export const ModalStyle = styled.div<ModalStyleProps>(({ theme, fullWidth, hasHeader }) => ({
  position: 'relative',
  maxWidth: 704,
  margin: theme.margin.xl,
  padding: `${theme.padding.l} ${theme.padding.xl}`,
  paddingTop: !hasHeader ? theme.margin.xl : undefined,
  borderRadius: 8,
  background: theme.rebrandingColors.gradients.blue,
  border: '0.5px solid transparent',
  backgroundOrigin: 'border-box',
  backgroundClip: 'border-box',
  boxShadow: `inset 0 0 0 1000px ${theme.rebrandingColors.palette.dark[80]}`,
  outline: 'none',
  width: fullWidth ? '100%' : undefined,

  [`${mq.with({ theme }).until(screen.SM)}`]: {
    margin: theme.margin.l,
    padding: theme.padding.l,
    maxWidth: 360,
  },

  [`${mq.with({ theme }).between(screen.SM, screen.LG)}`]: {
    margin: theme.margin.m,
    padding: theme.padding.l,
    maxWidth: 480,
  },
}));

export const ModalHeader = styled(Flex).attrs({
  alignItems: 'flex-start',
  justifyContent: 'space-between',
})(({ theme }) => ({
  marginBottom: theme.margin.s,
}));

export const ModalTitle = styled(Heading).attrs({
  element: 'h2',
  size: 'h5',
})<ModalHeaderProps>(({ theme, center, hasCloseButton }) => ({
  width: '100%',
  paddingRight: hasCloseButton ? theme.margin.l : undefined,
  color: theme.rebrandingColors.palette.light[20],
  textAlign: center ? 'center' : 'left',
  fontWeight: 700,
  textTransform: 'uppercase',
}));

export const CloseButton = styled.button.attrs({ type: 'button' })(() => ({
  border: 'none',
  background: 'none',
  cursor: 'pointer',
}));

export const ClickBarrier = styled.div({
  display: 'inline-flex',
});

export const Container = styled(Flex)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
