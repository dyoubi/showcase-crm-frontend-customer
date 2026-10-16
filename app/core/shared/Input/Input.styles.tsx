import styled from 'styled-components';

import { getTypography, visuallyHidden } from '@/themes/mixins';

import { FieldVariant } from '../FeedbackMessage';

import { mq, screen } from '@/libs/media-query';

export const StyledLabel = styled.label<{ variant: FieldVariant }>(({ theme, variant }) => ({
  marginBottom: theme.margin.xxs,
  ...getTypography(theme.typography.subheadline),

  color:
    variant === FieldVariant.Disabled
      ? theme.rebrandingColors.colorsToBeDeprecated.gray[60]
      : theme.rebrandingColors.palette.light[20],

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    ...getTypography(theme.typography.body.medium),
  },
}));

export const InputWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

export const VisuallyHidden = styled.span(() => visuallyHidden);
