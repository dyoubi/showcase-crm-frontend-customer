import styled from 'styled-components';

export const Card = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.rebrandingColors.palette.dark[60],
  justifyContent: 'center',
  padding: theme.padding.s,
  borderRadius: theme.padding.xxs,
  gap: theme.padding.xxs,
}));

export const Username = styled.span(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[20],
  fontSize: theme.typography.subheadline.fontSize,
  fontWeight: theme.typography.subheadline.fontWeight,
  textAlign: 'right',
}));

export const DetailContainer = styled.div(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[40],
  fontSize: theme.typography.subheadline.fontSize,
  display: 'flex',
  justifyContent: 'space-between',
}));

export const Detail = styled.span(({ theme }) => ({
  fontWeight: theme.typography.subheadline.fontWeight,
}));
