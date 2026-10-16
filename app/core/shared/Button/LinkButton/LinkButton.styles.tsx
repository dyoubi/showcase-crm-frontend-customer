import styled from 'styled-components';
// import Link from 'next/link';

import { getButtonStyles } from '../Button.styles';
import { ButtonVariant } from '../Button.types';
import { LinkButtonProps } from './LinkButton.types';

export const StyledLinkButton = styled.span.withConfig({
  shouldForwardProp: (prop) => !['variant', 'color', 'isSelected'].includes(prop),
})<Omit<LinkButtonProps, 'href'>>(
  ({ theme, size, variant = ButtonVariant.Filled, color, customColor, isSelected }) => ({
    ...getButtonStyles(theme, size, false, isSelected, variant, color, undefined, customColor),

    textDecoration: 'none',
  }),
);
