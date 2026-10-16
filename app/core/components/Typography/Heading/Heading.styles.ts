import styled from 'styled-components';

import { HeadingProps } from './Heading.types';

export const StyledHeading = styled.h1<HeadingProps>(({ theme, align, color, size, whiteSpace }) => ({
  margin: 0,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.heading[size].fontSize,
  fontWeight: theme.typography.heading[size].fontWeight,
  letterSpacing: theme.typography.heading[size].letterSpacing,
  lineHeight: theme.typography.heading[size].lineHeight,
  textAlign: align,
  color: color || theme.rebrandingColors.palette.light[20],

  ...(whiteSpace
    ? {
        whiteSpace,
      }
    : {}),
}));

StyledHeading.displayName = 'Heading';
StyledHeading.defaultProps = {
  align: 'left',
  size: 'h1',
};
