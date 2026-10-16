import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

export const StyledCaption = styled.span(({ theme }) => ({
  ...getTypography(theme.typography.caption),
}));
