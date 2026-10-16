import styled, { DefaultTheme } from 'styled-components';

export const Spacer = styled.div<{ size?: keyof DefaultTheme['margin'] }>(({ theme, size = 'l' }) => ({
  width: theme.margin[size],
  height: theme.margin[size],
}));
