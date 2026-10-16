import styled from 'styled-components';

import { Heading } from '@/core/components/Typography/Heading';
import { Flex } from '@/core/shared';

import { mq, screen } from '@/libs/media-query';

// export const PageHeaderContentContainer = styled(Flex)(({ theme }) => ({
//   width: '100%',
//   alignItems: 'center',
//   alignSelf: 'self-end',
//   margin: '61px auto 16px',
//   padding: theme.padding.xs,

//   maxWidth: 1175,
//   [`${mq.with({ theme }).until(screen.LG)}`]: {
//     marginLeft: 20,
//   },
// }));

export const StyledHeading = styled(Heading)(({ theme }) => ({
  fontWeight: 700,

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontWeight: 500,
    fontSize: 24,
  },
}));

export const HeadingMobile = styled.h3(({ theme }) => ({
  fontSize: 18,
  textTransform: 'uppercase',
  marginTop: theme.margin.xxs,
  marginBottom: theme.margin.xxs,
}));
