import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

export const Username = styled.span(({ theme }) => ({
  marginLeft: theme.margin.m,
  marginRight: 'auto',
}));

export const BetCell = styled.td({
  '& > p': {
    justifyContent: 'flex-start',
  },
});

export const CurrencyCell = styled.td({
  padding: '5px',

  '& > p': {
    justifyContent: 'center',
  },
});

export const MultiplierCell = styled.td(({ theme }) => ({
  paddingLeft: 0,
  fontWeight: 'bold',
  '& > p': {
    justifyContent: 'flex-start',
  },
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    '& > p': {
      justifyContent: 'center',
    },
  },
}));

export const MultiplierTextContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.rebrandingColors.palette.dark[40],
  padding: theme.padding.xxxs,
  borderRadius: 8,
}));

export const GameCell = styled.td(({ theme }) => ({
  paddingLeft: theme.padding.m,
  marginLeft: theme.margin.m,
}));

export const StyledTableRow = styled.tr<{ isClickable?: boolean }>(({ theme, isClickable }) => ({
  background: theme.rebrandingColors.palette.dark[80],
  marginBottom: '10px',

  '&:hover': {
    cursor: isClickable ? 'pointer' : 'auto',
  },

  '& > td': {
    '& > p': {
      fontWeight: 'bold',
    },
  },
  '&:last-of-type': {
    WebkitMask: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(21, 15, 48, 0.00) 66.89%)',
    mask: 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(21, 15, 48, 0.00) 66.89%)',
    WebkitMaskComposite: 'destination-in',
    maskComposite: 'exclude',
  },
}));
