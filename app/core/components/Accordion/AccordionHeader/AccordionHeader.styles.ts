import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { AccordionVariant } from '../Accordion.types';

export const StyledHeader = styled.button<{
  isActive?: boolean;
  variant: AccordionVariant;
}>(({ theme, isActive, variant }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: theme.margin.xs,
  padding: theme.padding.s,

  border: `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.dark[20]}`,
  borderRadius: 6,

  ...(isActive && variant === AccordionVariant.Default
    ? {
        marginBottom: 0,
        borderBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {}),

  backgroundColor: theme.rebrandingColors.palette.dark[20],
  textAlign: 'left',
  appearance: 'none',
  cursor: 'pointer',

  color: theme.rebrandingColors.palette.light[20],
  ...getTypography(theme.typography.body.medium),
  fontFamily: 'inherit',
  fontWeight: 600,

  svg: {
    marginRight: theme.margin.xs,
  },
}));

export const StyledHeaderLabel = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
