import styled from 'styled-components';

import { Caption, Subheadline } from '@/core/components/Typography';

export const VIPModalContainer = styled.div({
  textAlign: 'center',
});

export const Row = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: `${theme.margin.xxs} 0`,
  padding: `0 ${theme.margin.xxs}`,
}));

export const SingleColRow = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  margin: `${theme.margin.xxs} 0`,
  padding: `0 ${theme.margin.xxs}`,
}));

export const LevelLabel = styled.p<{ left?: boolean }>(({ theme, left }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: 0,

  ...(left
    ? {
        marginLeft: `-${theme.margin.xxs}`,
      }
    : {}),

  svg: {
    height: 84,
  },
}));

export const StyledCaption = styled(Caption)({
  fontSize: 14,
  lineHeight: '16px',
  fontWeight: 400,
});

export const LevelTitle = styled(Subheadline)({
  flexDirection: 'row',
  alignSelf: 'center',
  fontWeight: 700,
  fontSize: 16,
  marginBottom: 8,
  marginTop: 8,
});
