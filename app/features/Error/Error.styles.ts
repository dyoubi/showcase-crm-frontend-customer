import styled from 'styled-components';

export const ErrorContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'cener',
  minHeight: 400,
  marginTop: theme.margin.xl,
  textAlign: 'center',
}));
