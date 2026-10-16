import styled, { CSSObject, DefaultTheme } from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

export const getButtonStyles = (
  theme: DefaultTheme,
  size?: ButtonSize,
  isLoading?: boolean,
  isSelected?: boolean,
  variant?: ButtonVariant,
  color?: ButtonColor,
  disableHoverStyles?: boolean,
  customColor?: string,
): CSSObject => ({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  padding: '16px 60px',
  border: 'none',
  borderRadius: 6,
  color: theme.rebrandingColors.palette.light[20],
  width: size === ButtonSize.Block ? '100%' : 'max-content',
  fontWeight: 700,
  fontFamily: 'inherit',
  ...(size
    ? {
        fontSize: size && theme.typography.button[size].fontSize,
        lineHeight: size && theme.typography.button[size].lineHeight,
        letterSpacing: size && theme.typography.button[size].letterSpacing,
        padding: theme.sizes.button.padding[size],
      }
    : {}),

  textAlign: 'center',
  transition: 'background 0.2s ease-in-out',
  cursor: 'pointer',

  ...(!disableHoverStyles
    ? {
        '&:hover': {
          filter: 'brightness(1.2)',
          color: theme.rebrandingColors.palette.light[20],
          svg: {
            stroke: theme.rebrandingColors.palette.light[20],
          },
        },
      }
    : {}),

  '&[disabled], &[disabled]:hover': {
    opacity: 0.3,
    cursor: 'not-allowed',

    svg: {
      opacity: 0.5,
    },
  },

  ...(color === ButtonColor.Primary
    ? {
        background: theme.rebrandingColors.gradients.blue,
      }
    : {}),
  ...(color === ButtonColor.Secondary
    ? {
        background: theme.rebrandingColors.gradients.red,
      }
    : {}),
  ...(color === ButtonColor.Tertiary
    ? {
        background: theme.rebrandingColors.palette.dark[60],
        '&, &:focus, &:active': {
          ...(isSelected
            ? {
                background: theme.rebrandingColors.gradients.blue,
                color: theme.rebrandingColors.palette.light[20],
              }
            : {}),
        },
      }
    : {}),

  ...(customColor &&
    variant === ButtonVariant.Filled && {
      background: customColor,
    }),

  ...(variant === ButtonVariant.Outlined
    ? {
        '&, &:focus, &:active': customColor
          ? {
              border: `2px solid ${customColor}`,
              color: customColor,
              background: 'transparent',
            }
          : {
              position: 'relative',
              background: theme.rebrandingColors.gradients.blue,
              border: '2px solid transparent',
              backgroundOrigin: 'border-box',
              backgroundClip: 'border-box',
              boxShadow: `inset 0 0 0 1000px ${theme.rebrandingColors.palette.dark[60]}`,
            },

        '&[disabled], &[disabled]:hover': {
          color: theme.rebrandingColors.palette.dark[20],
          border: `2px solid ${theme.rebrandingColors.palette.dark[20]}`,
          backgroundColor: 'transparent',
          background: 'transparent',
        },
      }
    : {}),

  ...(isLoading
    ? {
        '&[disabled], &[disabled]:hover': {
          ...(size === ButtonSize.Big
            ? {
                paddingTop: 10,
                paddingBottom: 10,
              }
            : {}),
          ...(size === ButtonSize.Medium
            ? {
                paddingTop: 5,
                paddingBottom: 5,
              }
            : {}),
          ...(size === ButtonSize.Small
            ? {
                paddingTop: 3.75,
                paddingBottom: 3.75,
              }
            : {}),

          svg: {
            fill: theme.rebrandingColors.palette.light[20],
            stroke: 'none',
            opacity: 1,
          },
        },
      }
    : {}),
});

export const StyledButton = styled.button<ButtonProps>(
  ({ theme, size, isLoading, isSelected, variant, color, disableHoverStyles, customColor }) => ({
    ...getButtonStyles(theme, size, isLoading, isSelected, variant, color, disableHoverStyles, customColor),
  }),
);

const InnerElementWrapper = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const LeftElementWrapper = styled(InnerElementWrapper)(({ theme }) => ({
  marginRight: theme.margin.xs,
}));

export const RightElementWrapper = styled(InnerElementWrapper)(({ theme }) => ({
  marginLeft: theme.margin.xs,
}));

export const InlineLinkButton = styled.button(({ theme }) => ({
  ...getTypography(theme.typography.body.medium),
  color: theme.rebrandingColors.colorsToBeDeprecated.blue[60],
  fontFamily: theme.typography.fontFamily,

  display: 'inline',
  cursor: 'pointer',

  border: 'none',
  background: 'none',

  padding: 0,

  fontWeight: 600,

  '&:hover': {
    color: theme.rebrandingColors.palette.dark[60],
  },
}));
