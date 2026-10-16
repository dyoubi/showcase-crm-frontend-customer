import styled from 'styled-components';

export const BetCell = styled.td({
  paddingRight: 0,

  '& > p': {
    justifyContent: 'flex-end',
  },
});

export const CurrencyCell = styled.td({
  padding: '5px',

  '& > p': {
    justifyContent: 'center',
  },
});

export const PayoutCell = styled.td({
  paddingLeft: 0,

  '& > p': {
    justifyContent: 'flex-start',
  },
});

export const TypeCell = styled.td({
  textTransform: 'uppercase',
});
