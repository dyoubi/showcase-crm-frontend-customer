import styled from 'styled-components';
import Link from 'next/link';

import { InputProps } from '@/core/shared/Input/Input.types';
import { Button } from '@/core/shared/Button';
import { Input } from '@/core/shared/Input';

import { getTypography } from '@/themes/mixins';

export const SuccessAlertButton = styled(Button)(({ theme }) => ({
  background: theme.rebrandingColors.palette.green[20],

  '&:hover, &:focus': {
    background: theme.rebrandingColors.colorsToBeDeprecated.green[40],
  },
}));

export const ErrorMessage = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.rebrandingColors.colorsToBeDeprecated.red[100],
  textAlign: 'center',
  ...getTypography(theme.typography.caption),
  fontWeight: 400,
  svg: {
    marginRight: theme.margin.xxs,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.rebrandingColors.colorsToBeDeprecated.link,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  fontSize: theme.typography.button.extraBig.fontSize,
}));
