import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

export const TableScrollable = styled.div<{ maxHeight?: string }>(({ maxHeight }) => ({
  width: '100%',
  overflow: 'auto',

  ...(maxHeight && {
    maxHeight,
  }),
}));

export const StyledTable = styled.table<{ minWidth: number }>(({ minWidth, theme }) => ({
  ...(minWidth > 0
    ? {
        minWidth,
      }
    : {}),

  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: `0 ${theme.padding.s}`,
  padding: `0 ${theme.padding.s}`,
  marginBottom: theme.margin.m,
  background: theme.rebrandingColors.palette.dark[80],
  borderRadius: 10,
  whiteSpace: 'nowrap',

  ...getTypography(theme.typography.body.small),
  textAlign: 'left',

  '& th': {
    padding: `0 ${theme.padding.s}`,
  },

  '& td': {
    backgroundColor: theme.rebrandingColors.palette.dark[40],
    padding: `${theme.padding.xxs} ${theme.padding.s}`,

    color: theme.rebrandingColors.palette.gray[20],

    '& > *': {
      margin: 0,
    },

    '& > div': {
      display: 'flex',
      justifyContent: 'start',
      alignItems: 'center',
      gap: theme.padding.xxs,
    },
  },

  '& td:first-child': {
    borderRadius: `${theme.padding.xxs} 0 0 ${theme.padding.xxs}`,
  },

  '& td:last-child': {
    borderRadius: `0 ${theme.padding.xxs} ${theme.padding.xxs} 0`,
  },

  '& tr': {
    // height: '57px',
    height: 'auto',
  },
}));

export const ButtonIcon = styled.button(() => ({
  backgroundColor: 'transparent',
  border: 0,
  cursor: 'pointer',
}));
