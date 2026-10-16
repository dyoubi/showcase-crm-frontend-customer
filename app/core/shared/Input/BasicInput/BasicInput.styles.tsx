import styled, { DefaultTheme } from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { FieldVariant } from '../../FeedbackMessage';
import { InputSizes } from '../Input.types';

import { mq, screen } from '@/libs/media-query';

const inputVariantStyle = (theme: DefaultTheme, variant: FieldVariant) =>
  ({
    [FieldVariant.Default]: {},
    [FieldVariant.Disabled]: {},
    [FieldVariant.Error]: {
      border: `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.red[100]}`,
      boxShadow: 'none',
    },
    [FieldVariant.Valid]: {
      border: `1px solid ${theme.rebrandingColors.palette.green[20]}`,
      boxShadow: 'none',
    },
  }[variant]);

const inputSizeStyle = (inputSize: InputSizes) =>
  ({
    [InputSizes.sm]: {
      width: '232px',
    },
    [InputSizes.md]: {
      width: '352px',
    },
    [InputSizes.lg]: {
      width: '482px',
    },
    [InputSizes.block]: {
      width: '100%',
    },
  }[inputSize]);

export const StyledInput = styled.input<{
  selectable?: boolean;
  variant: FieldVariant;
  inputSize?: InputSizes;
}>(({ theme, selectable, variant, inputSize }) => ({
  ...inputSizeStyle(inputSize || InputSizes.block),
  padding: theme.padding.s,

  background: theme.rebrandingColors.palette.dark[100],
  border: '2px solid transparent',
  borderRadius: 6,

  color: theme.rebrandingColors.palette.light[20],
  colorScheme: 'dark',
  ...getTypography(theme.typography.body.medium),
  fontFamily: 'inherit',
  textAlign: 'left',
  appearance: 'none',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    ...getTypography(theme.typography.body.medium),
  },

  '&:focus': {
    outline: 'none',
    position: 'relative',
    background: theme.rebrandingColors.gradients.blue,
    border: '2px solid transparent',
    backgroundOrigin: 'border-box',
    backgroundClip: 'border-box',
    boxShadow: `inset 0 0 0 1000px ${theme.rebrandingColors.palette.dark[100]}`,
  },

  '&:hover:not([read-only]), &:hover:not([disabled])': {
    cursor: 'text',
  },

  '&::placeholder': {
    color: theme.rebrandingColors.palette.light[40],
  },

  '&:disabled, &:read-only': {
    opacity: 0.7,
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    appearance: 'none',
  },

  '&[type="number"]': {
    appearance: 'textfield',
  },

  ...inputVariantStyle(theme, variant),

  ...(selectable === false
    ? {
        userSelect: 'none',
        pointerEvents: 'none',

        '&:hover, &[readonly]:hover, &[disabled]:hover': {
          cursor: 'default',
        },
      }
    : {}),
}));
