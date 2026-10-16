import styled from 'styled-components';
import { DefaultTheme } from 'styled-components/dist/types';

import { getTypography } from '@/themes/mixins';

import { TextProps } from './Text.types';

const getTextVariance = (theme: DefaultTheme, color: TextProps['color'], type: NonNullable<TextProps['type']>) =>
  ({
    default: {
      color: color || theme.rebrandingColors.palette.light[20],
    },
    link: {
      color: theme.rebrandingColors.palette.dark[60],
      fontWeight: 700,
    },
    subtle: {
      color: theme.rebrandingColors.palette.gray[20],
    },
  }[type]);

export const StyledText = styled.p<TextProps>(
  ({ theme, align, color, level, marginBottom, type = 'default', whiteSpace }) => ({
    margin: 0,
    padding: 0,
    // This should be by default to avoid using <Space> or custom elements
    marginBottom: marginBottom ? theme.margin[marginBottom] : undefined,
    textAlign: align || 'left',
    whiteSpace: whiteSpace || undefined,

    ...getTypography(theme.typography.body[level]),
    ...getTextVariance(theme, color, type),
  }),
);
