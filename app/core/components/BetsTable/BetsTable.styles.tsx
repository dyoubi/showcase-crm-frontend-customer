import styled from 'styled-components';

// TODO: Standardize as Card? */}
export const EmptyLabelContainer = styled.div(({ theme }) => ({
  background: theme.rebrandingColors.palette.dark[60],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '200px',
  height: '100%',
  borderRadius: '6px',
}));
