import styled from 'styled-components';

import { Button, Flex } from '@/core/shared';

export const ContentWrapper = styled(Flex)<{ isProviderSelectorOpen: boolean }>(
  ({ theme, isProviderSelectorOpen }) => ({
    flexDirection: 'column',
    ...(isProviderSelectorOpen && {
      height: 455,
    }),
  }),
);

export const FilterButton = styled(Button)<{ isProviderSelectorOpen: boolean }>(
  ({ theme, isProviderSelectorOpen }) => ({
    alignSelf: 'center',
    marginTop: theme.margin.l,
    ...(isProviderSelectorOpen && {
      marginTop: 'auto',
    }),
  }),
);
