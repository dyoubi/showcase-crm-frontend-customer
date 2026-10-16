import styled from 'styled-components';

export const TopMenuContainer = styled.header(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  zIndex: 10,
  width: '100%',
  height: '61px',
  background: theme.rebrandingColors.palette.dark[80],
}));

export const NavigationProgressBar = styled.div<{ progress: number }>(({ theme, progress }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: `${progress}%`,
  height: '4px',
  background: theme.rebrandingColors.gradients.blue,
  transition: 'width 0.3s ease-in-out',
  zIndex: 11,
  opacity: progress > 0 ? 1 : 0,
}));
