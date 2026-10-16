import styled from 'styled-components';

import { Table } from '@/core/shared/Table';

import { mq, screen } from '@/libs/media-query';

export const TableContainer = styled.div(({ theme }) => ({
  position: 'relative',
  paddingInline: theme.padding.xs,
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  [`${mq.with({ theme }).from(screen.LG)} and ${mq.with({ theme }).until(screen.XL)}`]: {
    '& >0 td': {
      padding: '0 10px',
    },
  },
}));

export const BetsTableHeader = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.padding.xs,
  marginBottom: theme.margin.m,
}));

// TODO: Standardize as Card? */}
export const EmptyLabelContainer = styled.div(({ theme }) => ({
  background: `${theme.rebrandingColors.palette.dark[20]}99`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '200px',
  height: '100%',
  borderRadius: '6px',
}));
