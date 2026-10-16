import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

export const VIPModalLotteryContainer = styled.div({
  textAlign: 'center',
});

export const LotteryFooter = styled.p(({ theme }) => ({
  ...getTypography(theme.typography.body.small),
}));
