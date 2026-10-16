import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

export const StyledHeadline = styled.p(({ theme }) => ({
  ...getTypography(theme.typography.headline),
  margin: 0,
  alignSelf: 'self-end',
}));
