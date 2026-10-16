import styled from 'styled-components';

import { IconClose } from '@/core/shared/Icons';

import { getTypography } from '@/themes/mixins';

export const Row = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.padding.xxs} ${theme.padding.xs}`,
}));

export const Item = styled.button(({ theme }) => ({
  display: 'flex',
  margin: 0,
  padding: 0,
  width: '100%',
  background: 'none',
  border: 0,
  cursor: 'pointer',
  fontFamily: theme.typography.fontFamily,
  ...getTypography(theme.typography.body.small),
}));

export const StyledIconClose = styled(IconClose)({
  cursor: 'pointer',
});
