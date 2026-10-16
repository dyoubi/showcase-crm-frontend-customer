import styled from 'styled-components';

import { StyledButton } from '@/core/shared/Button/Button.styles';

import { FieldVariant } from '../../FeedbackMessage';
import { BasicInput } from '../BasicInput/BasicInput';
import { BasicInputProps } from '../Input.types';

export const IconInputWrapper = styled.div<{
  hasButton: boolean;
  variant: FieldVariant;
}>(({ theme, hasButton, variant }) => ({
  position: 'relative',

  ...(hasButton && { display: 'flex' }),

  [StyledButton]: {
    ...(hasButton && {
      borderRadius: '0 6px 6px 0',
      paddingTop: theme.padding.s,
      paddingBottom: theme.padding.s,
    }),

    svg: {
      stroke:
        variant === FieldVariant.Disabled
          ? theme.rebrandingColors.colorsToBeDeprecated.gray[20]
          : theme.rebrandingColors.palette.light[20],
      color: theme.rebrandingColors.palette.light[20],
    },
  },
}));

export const StyledIconInput = styled(BasicInput)<{
  hasButton?: boolean;
  iconLeft?: boolean;
  iconRight?: boolean;
}>(({ theme, hasButton, iconLeft, iconRight }) => ({
  ...(iconLeft && { paddingLeft: `calc(${theme.padding.s} + 20px + ${theme.padding.xs})` }),
  ...(iconRight && { paddingRight: `calc(${theme.padding.s} + 20px + ${theme.padding.xs})` }),
  ...(hasButton && { borderTopRightRadius: 0 }),
  ...(hasButton && { borderBottomRightRadius: 0 }),
}));

const IconWrapper = styled.span<Pick<BasicInputProps, 'onClick'>>(({ onClick }) => ({
  height: 24,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  ...(onClick && { cursor: 'pointer' }),
}));

export const IconRightWrapper = styled(IconWrapper)(({ theme }) => ({
  right: 0,
  paddingRight: theme.padding.s,
}));

export const IconLeftWrapper = styled(IconWrapper)(({ theme }) => ({
  left: 0,
  paddingLeft: theme.padding.s,
}));
