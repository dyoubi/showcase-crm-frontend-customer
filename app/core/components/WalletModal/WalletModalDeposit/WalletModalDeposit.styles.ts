import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { Box } from '../../../shared/Box';

import { mq, screen } from '@/libs/media-query';

export const WalletModalDepositContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
});

export const CurrencyLimitationBox = styled.p(({ theme }) => ({
  padding: theme.padding.xxs,
  border: `1px dashed ${theme.rebrandingColors.palette.light[20]}`,
  ...getTypography(theme.typography.body.small),

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    ...getTypography(theme.typography.body.xsmall),
  },
}));

export const CurrencyCopy = styled.p(({ theme }) => ({
  ...getTypography(theme.typography.body.small),
  fontWeight: 700,
  textAlign: 'center',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    ...getTypography(theme.typography.body.xsmall),
  },
}));

export const SupportButton = styled.button(({ theme }) => ({
  color: 'inherit',
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
}));

export const SupportText = styled.span(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  marginLeft: theme.margin.xxs,
  cursor: 'pointer',
  ...getTypography(theme.typography.body.medium),
  fontWeight: 700,
}));

export const StyledQRBox = styled(Box)(({ theme }) => ({
  padding: '16px 16px 8px 16px',
  backgroundColor: 'white',
}));
