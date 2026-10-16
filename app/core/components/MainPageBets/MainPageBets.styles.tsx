import styled from 'styled-components';

// TODO: Standardize as Card */}
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

// TODO: Standardize as Card */}
export const Container = styled.div(({ theme }) => ({
  backgroundColor: theme.rebrandingColors.palette.dark[40],
  padding: theme.padding.m,
  borderRadius: '6px',
}));
