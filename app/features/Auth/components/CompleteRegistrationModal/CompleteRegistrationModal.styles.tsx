import styled from 'styled-components';

export const FormRow = styled.div({
  display: 'flex',
});

export const ButtonRow = styled(FormRow)(({ theme }) => ({
  justifyContent: 'center',
  marginTop: theme.margin.l,
}));

export const AddressRow = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto 131px',
});
