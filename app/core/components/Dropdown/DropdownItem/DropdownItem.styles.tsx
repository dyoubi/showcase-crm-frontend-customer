import styled from 'styled-components';

export const DropdownMenuItem = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  listStyle: 'none',
  cursor: 'pointer',
  fontWeight: 400,
  margin: 0,
  paddingLeft: theme.padding.xxs,
  padding: theme.padding.s,
  '&:hover': {
    background: theme.rebrandingColors.palette.light[80],
  },
}));

export const IconWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginRight: 8,
});

export const ItemContent = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});
