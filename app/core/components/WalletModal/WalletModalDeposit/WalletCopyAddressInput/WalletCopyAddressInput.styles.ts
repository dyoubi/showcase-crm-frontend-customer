import styled from 'styled-components';

import { Input } from '@/core/shared/Input';

export const StyledWalletCopyAddressInput = styled(Input)({
  textAlign: 'center',

  '&:read-only': {
    opacity: 1,
  },
});

export const WalletInputTooltip = styled.p(({ theme }) => ({
  position: 'absolute',
  right: theme.padding.xs,
  display: 'inline-flex',
  gap: theme.padding.xs,
  padding: theme.padding.s,
  borderRadius: 8,
  background: theme.rebrandingColors.colorsToBeDeprecated.dark[100],
}));
