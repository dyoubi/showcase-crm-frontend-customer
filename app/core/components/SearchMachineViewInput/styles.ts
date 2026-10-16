import styled from 'styled-components';

export const SearchBarContainer = styled.div(({ theme }) => ({
  margin: `0 auto ${theme.margin.xs}`,
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: theme.margin.xs,
}));
