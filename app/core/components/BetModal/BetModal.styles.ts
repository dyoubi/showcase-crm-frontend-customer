import styled from 'styled-components';

import { Modal } from '@/core/shared/Modal';
import { Caption, Headline } from '@/core/components/Typography';
import { Button } from '@/core/shared/Button';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';
import { Flex } from '@/core/shared';
import { IconPlay } from '@/core/shared/Icons/Play/Play';
import { CloseButton, ModalTitle } from '@/core/shared/Modal/Modal.styles';

import { getTypography } from '@/themes/mixins';

import { mq, screen } from '@/libs/media-query';

export const StyledModal = styled(Modal)(({ theme }) => ({
  maxWidth: 600,
  textAlign: 'center',
  gap: theme.margin.m,
  [ModalTitle]: {
    textTransform: 'none',
    ...getTypography(theme.typography.headline),
  },
  [CloseButton]: {
    top: '28px',
  },
}));

export const GameHeader = styled(Headline)(({ theme }) => ({
  marginBottom: 4,
  textAlign: 'start',
  alignSelf: 'start',
}));

export const BetId = styled.span({
  fontSize: 18,
  lineHeight: '24px',
});

export const StyledCaption = styled(Caption)({
  margin: 0,
  marginBottom: 8,
  fontSize: 12,
  lineHeight: '16px',
});

export const PlayerName = styled.span({
  fontSize: 18,
  lineHeight: '24px',
});

export const BetSummary = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  background: theme.rebrandingColors.palette.dark[60],
  borderRadius: 6,
  margin: `${theme.margin.xs} 0`,
}));

export const BetCell = styled.p(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  borderRight: `1px solid ${theme.rebrandingColors.palette.light[20]}`,
  padding: `${theme.padding.xs} ${theme.padding.xxs}`,
  ...getTypography(theme.typography.caption),
  textAlign: 'center',

  '&:last-child': {
    borderRight: 0,
  },
}));

export const BetCellValue = styled.span(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.padding.xxs,
  marginTop: theme.margin.xs,
}));

export const BetActionsContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: theme.padding.s,
}));

export const PlayButton = styled(Button).attrs({
  size: ButtonSize.Block,
  color: ButtonColor.Primary,
})(({ theme }) => ({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: `${theme.padding.xs} ${theme.padding.s}`,
  overflow: 'hidden',
  display: 'flex',
}));

export const ShareButton = styled(Button).attrs({
  size: ButtonSize.Small,
  color: ButtonColor.Tertiary,
})(({ theme }) => ({
  fontWeight: theme.typography.caption.fontWeight,
  height: 'fit-content',
  marginBottom: theme.margin.s,
  marginRight: 50,
  '&:hover': {
    cursor: 'not-allowed',
  },
}));

export const BetValueContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: theme.padding.xs,
  [`${mq.with({ theme }).until(screen.SM)}`]: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export const BetDetailContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.padding.xs,
}));

export const GameDetailContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'row',
  gap: theme.padding.xs,
}));

export const ThumbnailWrapper = styled.div(({ theme }) => ({
  flexShrink: 0,
  width: '80px',

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    width: '60px',
  },
}));

export const GameProvider = styled.div(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[40],
  fontSize: theme.typography.subheadline.fontSize,
}));

export const GameInformationColumn = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
}));

export const ContentContainer = styled(Flex)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.padding.m,
}));

export const StyledIconPlay = styled(IconPlay)({
  fill: 'currentColor',
});
