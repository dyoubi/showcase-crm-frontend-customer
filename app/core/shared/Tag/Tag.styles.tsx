import styled from 'styled-components';

export const StyledTag = styled.span<{ color?: string; fontSize?: number }>(({ theme, color, onClick }) => ({
  display: 'block',
  background: color || theme.rebrandingColors.gradients.blue,
  padding: `${theme.padding.xxxs} ${theme.padding.xs}`,
  borderRadius: 6,
  fontSize: 14,
  cursor: onClick && 'pointer',
}));
