import { CSSObject, TypographyParameters } from 'styled-components';

export const getTypography = (params: TypographyParameters) => ({
  fontSize: params.fontSize,
  fontWeight: params.fontWeight,
  lineHeight: params.lineHeight,
  letterSpacing: params.letterSpacing,
});

export const visuallyHidden: CSSObject = {
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  opacity: 0,
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
};
