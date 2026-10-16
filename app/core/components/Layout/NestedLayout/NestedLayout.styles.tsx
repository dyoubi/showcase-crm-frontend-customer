import styled from 'styled-components';

import { Heading } from '../../Typography';

import { mq, screen } from '@/libs/media-query';

export const PageHeader = styled.div<{ img?: string }>(({ theme, img }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: '61px auto 16px',
  padding: 15,
  justifyContent: 'left',

  [`${mq.with({ theme }).from(screen.LG)}`]: {
    // padding: `${theme.padding.s} 96px`,
    maxWidth: 1175,
  },
}));

// export const Container = styled.div(({ theme }) => ({
//   display: 'flex',
//   width: '100%',
//   margin: '0 auto',
//   padding: theme.padding.xs,
//   flexDirection: 'column',
//   maxWidth: 1175,
//   [`${mq.with({ theme }).until(screen.LG)}`]: {
//     padding: 15,
//     margin: '0 auto',
//   },
// }));

export const LeftContainer = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: 200,
  marginLeft: 40,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    maxWidth: '100%',
    marginLeft: 0,
  },
}));

export const RightContainer = styled.div({});

export const StyledHeading = styled(Heading)(({ theme }) => ({
  fontWeight: 700,
  fontSize: theme.typography.heading.h2.fontSize,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontSize: theme.typography.heading.h3.fontSize,
    lineHeight: theme.typography.heading.h3.lineHeight,
  },
}));
