import styled from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';

import { DepositStatus, EDepositStatus, EWithdrawalStatus, WithdrawalStatus } from '@/core/domains/transaction';
import { Table } from '@/core/shared';

import { getTypography } from '@/themes/mixins';

const getTextVariance = (theme: DefaultTheme, status: DepositStatus | WithdrawalStatus) => {
  if (status === EDepositStatus.REJECTED || status === EWithdrawalStatus.CANCELLED) {
    return {
      color: theme.rebrandingColors.colorVariants.danger,
    };
  }

  if (status === EDepositStatus.PROCESSED || status === EWithdrawalStatus.PAID) {
    return {
      color: theme.rebrandingColors.colorVariants.success,
    };
  }

  // Should be left as last since these two statuses could be overlapped
  if (status === EDepositStatus.PENDING || status === EWithdrawalStatus.PENDING) {
    return {
      background: theme.rebrandingColors.gradients.blue,
      backgroundClip: 'text',
      '-webkit-background-clip': 'text',
      color: 'transparent',
    };
  }

  // This should never be executed
  return false;
};

export const WithdrawlTable = styled(Table)(({ theme }) => ({
  '& th': {
    ...getTypography(theme.typography.body.small),
  },
  '& td': {
    ...getTypography(theme.typography.body.small),
  },

  tr: {
    position: 'relative',
  },

  'td.date': {
    position: 'relative',
    // paddingLeft: 30,

    'span.hanging': {
      background: 'transparent',
      position: 'absolute',
      left: 16,
      top: -10,
      // transform: 'rotate(-45deg)',
    },
  },
}));

export const StatusCell = styled.span<{ status: DepositStatus | WithdrawalStatus }>(({ theme, status }) => ({
  textTransform: 'capitalize',
  ...getTextVariance(theme, status),
  ...getTypography(theme.typography.body.small),
}));
