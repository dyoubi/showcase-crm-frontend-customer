import styled from 'styled-components';

import { Text } from '../Typography/Text';

import { mq, screen } from '@/libs/media-query';

export const FilterBarContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  [`${mq.with({ theme }).until(screen.SM)}`]: {
    margin: 0,
  },
}));

export const InnerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const StyledText = styled(Text)({
  margin: '0 10px 0 15px',
});
