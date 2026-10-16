import styled from 'styled-components';

import { IconInput } from '@/core/shared/Input';

import { mq, screen } from '@/libs/media-query';

export const ProvidersGrid = styled.div(({ theme }) => ({
  marginTop: 24,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '1rem',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
  },
}));

export const StyledSearchBar = styled(IconInput)(() => ({
  marginTop: 6,
  padding: '8px 8px 8px 48px',
  borderRadius: 6,
}));
