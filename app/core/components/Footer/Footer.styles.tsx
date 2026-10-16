import styled from 'styled-components';

import { Heading, Text } from '@/core/components/Typography';

import { mq, screen } from '@/libs/media-query';

export const FooterContainer = styled.footer(({ theme }) => ({
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    marginLeft: 0,
    marginBottom: theme.margin.l,
  },
}));

export const FooterWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: theme.rebrandingColors.palette.dark[40],
  borderRadius: '8px',
  padding: '0 15px',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    paddingBottom: theme.padding.l,
  },
}));

export const Divider = styled.div<{ color?: string }>(({ theme, color }) => ({
  display: 'inline-block',
  width: '100%',
  height: '1px',
  backgroundColor: color || theme.rebrandingColors.colorsToBeDeprecated.gray[40],
}));

export const FooterLinks = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  maxWidth: '1192px',
  padding: `${theme.padding.xxl} 0`,

  a: {
    textDecoration: 'none',
  },

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    padding: `${theme.padding.m} 0`,
    flexDirection: 'column',
    justifyContent: 'start',
  },
}));

export const LinkContainer = styled.div(({ theme }) => ({
  display: 'flex',

  ':first-of-type': {
    justifyContent: 'space-around',
  },
  ':last-of-type': {
    flexDirection: 'column',
  },
}));

export const StyledHeading = styled(Heading)<{ align?: 'left' | 'center' | 'right' }>(({ theme, align }) => ({
  marginBottom: '20px',
  textAlign: align || 'left',
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    marginBottom: '10px',
    fontSize: '18px',
  },
}));

export const LinkText = styled.span(({ theme }) => ({
  marginBottom: '10px',
  fontSize: '18px',
  cursor: 'pointer',
  color: theme.rebrandingColors.palette.light[40],
}));

export const CollapsibleHeader = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
}));

export const Column = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  rowGap: theme.margin.xs,
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    marginBottom: theme.margin.m,
  },
}));

export const ColumnSection = styled(Column)(({ theme }) => ({
  paddingBlock: theme.padding.l,
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    marginBottom: 0,
  },
}));

export const FooterLogos = styled.div(({ theme }) => ({
  padding: `${theme.padding.l} 0`,
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    width: '100%',
    padding: `${theme.padding.m}`,
  },
}));

export const Row = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:first-of-type': {
    marginBottom: '30px',
  },
  '& > svg, & > img, & > a': {
    margin: '0 46px',
  },
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    '& > svg, & > img, & > a': {
      margin: '0 4px',
    },
  },
}));

export const Credits = styled.div(({ theme }) => ({
  maxWidth: '1192px',
  padding: '42px 22px',
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    padding: `${theme.padding.m}`,
  },
}));

export const FooterText = styled(Text)<{ isBold?: boolean; align?: string }>(({ isBold, align, theme }) => ({
  color: theme.rebrandingColors.palette.light[40],
  fontWeight: isBold ? '700' : '400',
  textAlign: 'center',

  [`${mq.with({ theme, align }).until(screen.MD)}`]: {
    fontSize: '12px',
    marginBottom: theme.margin.xs,
    textAlign: align || 'justify',
  },
}));

export const Contact = styled.div(({ theme }) => ({
  padding: '34px 0',
  margin: 0,
  fontSize: '11px',
  textAlign: 'center',
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    display: 'flex',
    flexDirection: 'column',
    padding: `0 ${theme.padding.m} 0`,
  },
}));

export const ContactItem = styled.span(({ theme }) => ({
  padding: `0 ${theme.margin.s}`,
  [`${mq.with({ theme }).from(screen.MD)}`]: {
    '&:not(:last-of-type)': {
      borderRight: `1px solid ${theme.rebrandingColors.palette.light[20]}`,
    },
  },
  '& > a': {
    textDecoration: 'none',
  },
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    padding: `0 ${theme.margin.xxs}`,
  },
}));

export const StyledLinkText = styled(Text).attrs({
  level: 'small',
  as: 'span',
})(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  cursor: 'pointer',
  color: theme.rebrandingColors.colorsToBeDeprecated.link,
}));

export const MenuItemContainer = styled.div(({ theme }) => ({
  display: 'flex',
  padding: '8px 8px',
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    padding: '10px 2px',
  },
}));

export const License = styled.div(({ theme }) => ({
  height: 64,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: 'min-content',
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    margin: '0 16px',
  },
}));

export const ResponsibleGamblingLink = styled.div(({ theme }) => ({
  margin: '0 56px',
}));
