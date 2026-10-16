import styled, { DefaultTheme } from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { FieldVariant } from './FeedbackMessage.types';

const fieldVariantStyle = (theme: DefaultTheme, withInput: boolean, variant: FieldVariant) =>
  ({
    [FieldVariant.Default]: {
      color: withInput
        ? theme.rebrandingColors.colorsToBeDeprecated.dark[20]
        : theme.rebrandingColors.palette.light[20],

      'svg, svg *': {
        stroke: withInput
          ? theme.rebrandingColors.colorsToBeDeprecated.dark[20]
          : theme.rebrandingColors.palette.light[20],
      },
    },
    [FieldVariant.Disabled]: {
      color: theme.rebrandingColors.palette.light[40],

      'svg, svg *': {
        stroke: theme.rebrandingColors.palette.light[40],
      },
    },
    [FieldVariant.Error]: {
      color: theme.rebrandingColors.colorsToBeDeprecated.red[100],

      'svg, svg *': {
        stroke: theme.rebrandingColors.colorsToBeDeprecated.red[100],
      },
    },
    [FieldVariant.Valid]: {
      color: theme.rebrandingColors.palette.green[20],

      'svg, svg *': {
        stroke: theme.rebrandingColors.palette.green[20],
      },
    },
  }[variant]);

export const StyledFeedbackMessage = styled.div<{
  withInput: boolean;
  variant?: FieldVariant;
}>(({ theme, withInput, variant }) => ({
  ...getTypography(theme.typography.caption),
  fontWeight: 300,

  marginTop: theme.margin.xs,

  display: 'flex',
  alignItems: 'center',

  svg: {
    width: 13,
    height: 13,
    flexShrink: 0,
  },

  ...(variant ? fieldVariantStyle(theme, withInput, variant) : {}),
}));

export const FeedbackMessageTextWrapper = styled.span(({ theme }) => ({
  marginLeft: theme.margin.xxs,
}));
