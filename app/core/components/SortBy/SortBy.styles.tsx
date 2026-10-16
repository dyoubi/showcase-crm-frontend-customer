import styled from 'styled-components';

import { Select } from '@/core/shared';
import { StyledLabel } from '@/core/shared/Select/Select.styles';

export const StyledSortByWrapper = styled.div(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 6,
  backgroundColor: theme.rebrandingColors.palette.dark[10],
  padding: '6px 12px',
  borderRadius: 6,
  label: {
    width: 'max-content',
    fontWeight: theme.typography.heading.h1.fontWeight,
  },
}));

export const StyledSelect = styled(Select)`
  .select__single-value,
  .select__placeholder {
    ${({ theme }) => `
        color: ${theme.rebrandingColors.palette.light[20]};
      `}
  }
`;
