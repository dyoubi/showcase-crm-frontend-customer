import styled from 'styled-components';

import { Button } from '@/core/shared/Button';

import { getTypography } from '@/themes/mixins';

import { mq, screen } from '@/libs/media-query';

export const WalletModalWithdrawContainer = styled.div({
  textAlign: 'center',
});

export const WithdrawButton = styled(Button)(({ theme, isLoading }) => ({
  background: isLoading ? theme.rebrandingColors.palette.gray[20] : theme.rebrandingColors.palette.green[20],
}));

export const WalletModalFeesTable = styled.table(() => ({
  display: 'block',

  '& tbody': {
    display: 'block',
  },

  '& tbody tr': {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '& tbody tr:last-child p': { marginBottom: 0 },
  '& tbody tr th': { fontWeight: 'normal' },
}));

export const WalletModalLabel = styled.p<{ type?: 'primary' | 'secondary' | 'tertiary' }>(
  ({ theme, type = 'primary' }) => ({
    ...getTypography(theme.typography.body[type === 'primary' ? 'big' : 'small']),
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    marginBottom: theme.margin.xxs,
    color: type === 'tertiary' ? theme.rebrandingColors.palette.light[40] : 'inherit',
    lineHeight: '36px',
    textAlign: 'left',
    gap: theme.padding.xxs,

    [`${mq.with({ theme }).until(screen.LG)}`]: {
      ...getTypography(theme.typography.body[type === 'primary' ? 'small' : 'xsmall']),
    },
  }),
);
