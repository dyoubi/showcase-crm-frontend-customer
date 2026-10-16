import { DetailedHTMLProps, FC, ReactNode } from 'react';
import styled, { Sizing } from 'styled-components';

type NativeDivProps = DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type BoxProps = NativeDivProps & {
  align?: AlignSetting;
  p?: Sizing;
  pr?: Sizing;
  pl?: Sizing;
  pt?: Sizing;
  pb?: Sizing;
  m?: Sizing;
  mr?: Sizing;
  ml?: Sizing;
  mt?: Sizing;
  mb?: Sizing;
  width?: string;
  height?: string;
  children?: ReactNode;
};

const StyledBox = styled.div<BoxProps>(({ theme, align, m, mr, ml, mt, mb, p, pr, pl, pt, pb, width, height }) => ({
  margin: m && theme.margin[m],
  marginBottom: mb && theme.margin[mb],
  marginLeft: ml && theme.margin[ml],
  marginRight: mr && theme.margin[mr],
  marginTop: mt && theme.margin[mt],

  padding: p && theme.padding[p],
  paddingBottom: pb && theme.padding[pb],
  paddingLeft: pl && theme.padding[pl],
  paddingRight: pr && theme.padding[pr],
  paddingTop: pt && theme.padding[pt],

  width,
  textAlign: align,
  height,
}));

export const Box: FC<BoxProps> = ({ children, ...rest }) => <StyledBox {...rest}>{children}</StyledBox>;
