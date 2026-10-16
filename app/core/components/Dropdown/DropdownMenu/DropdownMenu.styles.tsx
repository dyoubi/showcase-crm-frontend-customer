import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

export const DropdownMenu = styled.div<{
  width?: string | number;
  minWidth?: string | number;
}>(({ width, minWidth, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  ...getTypography(theme.typography.body.medium),
  minWidth,
  width: width || 240,
  '& > *:last-child': {
    borderBottom: 'none !important',
  },
}));
