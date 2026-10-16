import styled from 'styled-components';

export const StyledBar = styled.div(({ theme }) => ({
  boxSizing: 'border-box',
  height: '15px',
  width: '100%',
  backgroundColor: '#484C56',
  borderRadius: '40px',
}));

export const Filler = styled.div<{ progress: number; customColor?: string }>(({ theme, progress, customColor }) => ({
  width: `${progress}%`,
  maxWidth: '100%',
  height: '100%',
  background: customColor || theme.rebrandingColors.palette.green[20],
  borderRadius: '40px',
}));
