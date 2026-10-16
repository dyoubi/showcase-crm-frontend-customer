import { theme } from '@themes/main';

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}

  export type TypographyParameters = {
    fontSize: string;
    fontWeight?: number;
    letterSpacing?: string;
    lineHeight?: string;
  };

  type TypographyTheme<T> = Record<T, TypographyParameters>;

  export type ComponentSize = 'extraBig' | 'big' | 'medium' | 'small' | 'block';
  export type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  export type Sizing = 'xxxs' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  export type TextAlign = 'left' | 'center' | 'right';
  export type RebrandingColors = 'dark' | 'light' | 'green';
  export type RebrandingGradients = 'blue' | 'yellow' | 'red' | 'orange' | 'green' | 'grey' | 'genesis';
  export type ColorVariants = 'success' | 'warning' | 'danger';

  interface Typography {
    fontFamily: string;
    body: TypographyTheme<Exclude<ComponentSize, 'extraBig'>, 'xsmall'>;
    button: TypographyTheme<ComponentSize>;
    caption: TypographyParameters;
    heading: TypographyTheme<HeadingSize>;
    headline: TypographyParameters;
    subheadline: TypographyParameters;
  }

  export interface DefaultTheme {
    padding: Record<Sizing, string>;
    margin: Record<Sizing, string>;
    typography: Typography;
    zIndexes: Record<'modal' | 'tooltip', number>;
    sizes: {
      icons: Record<Sizing, string | number>;
      button: {
        padding: Record<ComponentSize, string>;
      };
    };
    rebrandingColors: {
      gradients: Record<RebrandingGradients, string>;
      palette: Partial<Color, string>;
      backgroundColor: string;
      colorsToBeDeprecated: Partial<ColorsToBeDeprecated, string>;
      colorVariants: Partial<ColorVariants, string>;
    };
  }
}
