import styled from 'styled-components';

export const DropdownContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 30,
  flex: 1,
  padding: '6px 10px',
  borderRadius: 6,
  color: theme.rebrandingColors.palette.light[20],
  backgroundColor: theme.rebrandingColors.palette.dark[60],
  justifyContent: 'center',
  fontWeight: 700,
  userSelect: 'none',
}));

export const IconAndContentWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const IconWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  marginRight: theme.padding.xs,
}));

export const ItemContent = styled.div({
  textAlign: 'center',
  justifyContent: 'center',
  flex: 1,
  display: 'flex',
  alignItems: 'center',
});

export const ArrowsContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
