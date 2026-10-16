import styled, { DefaultTheme } from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { Button as ButtonRaw } from '../Button';
import * as t from './types';
import { FieldVariant } from '../FeedbackMessage';

type ColorVariant = t.InputWrapperProps['colorVariant'];

const inputVariantStyle = (theme: DefaultTheme, colorVariant: ColorVariant) =>
  ((
    {
      default: {
        border: 'none',
      },
      error: {
        border: `1px solid ${theme.rebrandingColors.colorsToBeDeprecated.red[100]}`,
        boxShadow: 'none',
      },
      success: {
        border: `1px solid ${theme.rebrandingColors.palette.green[20]}`,
        boxShadow: 'none',
      },
    } as const
  )[colorVariant || 'default']);

export const Root = styled.div<t.InputWrapperProps>(({ width, flex, disabled }) => ({
  width,
  flex,
  cursor: disabled ? 'not-allowed' : undefined,
}));

export const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  height: 57,
});

export const InputContainer = styled.div<{
  colorVariant: ColorVariant;
  withButton: boolean;
}>(({ theme, colorVariant, withButton }) => ({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  overflow: 'visible',
  boxSizing: 'border-box',
  background: theme.rebrandingColors.palette.dark[100],
  ...inputVariantStyle(theme, colorVariant),
  // when the button is on the right we must display the right border
  borderRight: withButton ? 'none' : undefined,
  borderRadius: withButton ? '6px 0px 0px 6px' : 6,
}));

export const Input = styled.input(({ theme }) => ({
  color: theme.rebrandingColors.palette.light[20],
  ...getTypography(theme.typography.body.medium),
  backgroundColor: 'transparent',

  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },

  '&:hover:not([read-only]), &:hover:not([disabled])': {
    cursor: 'text',
  },

  '&::placeholder': {
    color: theme.rebrandingColors.colorsToBeDeprecated.blue[20],
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
}));

export const Button = styled(ButtonRaw)({
  borderRadius: '0 6px 6px 0',
  height: '100%',
});

export const StyledLabel = styled.label<{ variant: FieldVariant }>(({ theme, variant }) => ({
  marginBottom: theme.margin.xxs,
  ...getTypography(theme.typography.subheadline),

  color:
    variant === FieldVariant.Disabled
      ? theme.rebrandingColors.colorsToBeDeprecated.gray[60]
      : theme.rebrandingColors.colorsToBeDeprecated.dark[100],
}));
