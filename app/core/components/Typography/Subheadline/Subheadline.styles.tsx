import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

export const StyledSubheadline = styled.span(({ theme }) => ({
  ...getTypography(theme.typography.subheadline),
}));
