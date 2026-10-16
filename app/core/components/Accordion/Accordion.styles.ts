import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

export const AccordionContent = styled.div<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: isExpanded ? theme.margin.xs : 0,
  padding: isExpanded ? theme.padding.s : 0,

  border: `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.dark[20]}`,
  borderTop: '2px solid #484C56',
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  backgroundColor: theme.rebrandingColors.palette.dark[20],
  textAlign: 'left',
  appearance: 'none',
  cursor: 'pointer',

  color: theme.rebrandingColors.palette.light[20],
  ...getTypography(theme.typography.button.small),
  maxHeight: isExpanded ? '1000px' : '0',
  overflow: 'hidden',
  opacity: isExpanded ? 1 : 0,
  transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
}));

export const AccordionContentContainer = styled.div<{ isExpanded: boolean }>(({ isExpanded }) => ({
  maxHeight: isExpanded ? '1000px' : '0',
  overflow: 'hidden',
  opacity: isExpanded ? 1 : 0,
  transition: 'max-height 0.3s ease-out, opacity 0.3s ease-out',
}));
