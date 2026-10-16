import styled from 'styled-components';

import { getTypography } from '@/themes/mixins';

import { InputWrapper } from '../InputWrapper';
import * as c from './constants';

import { mq, screen } from '@/libs/media-query';

export const Container = styled(InputWrapper)(({ theme, disabled }) => ({
  /** For prevent ts problems, we put styles on imask component
   *  by using the className
   */
  [`.${c.MaskInputClassName}`]: {
    width: '100%',

    background: 'transparent',
    cursor: disabled ? 'not-allowed' : undefined,
    pointerEvents: disabled ? 'none' : undefined,
    border: 'none',
    color: theme.rebrandingColors.palette.light[40],
    ...getTypography(theme.typography.body.medium),
    fontFamily: 'inherit',
    textAlign: 'left',
    appearance: 'none',

    [`${mq.with({ theme }).until(screen.LG)}`]: {
      ...getTypography(theme.typography.body.medium),
    },
    boxShadow: 'none',
    outline: 'none',
    '&:focus': {
      boxShadow: 'none',
      outline: 'none',
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
  },
}));
