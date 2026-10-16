import styled from 'styled-components';

import { mq, screen } from '@/libs/media-query';

// PageWrapper is the top most container of the page , it contains the TopMenu, MainWrapper and BottomMenu
export const PageWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: theme.rebrandingColors.palette.dark[20],
}));

// MainWrapper is the container of the main content of the page, it contains the LateralMenu and MainContainer
// @ts-ignore: !important rule error
export const MainWrapper = styled.div<{ sidebarOpen?: boolean }>(({ theme, sidebarOpen }) => ({
  display: 'flex',
  alignItems: 'flex-start',

  '.lateral-sticky-menu': {
    zIndex: 9,
    display: 'block',
    [`${mq.with({ theme, sidebarOpen }).until(screen.LG)}`]: {
      position: 'fixed !important',
      width: '100%',
      zIndex: 11,
      display: sidebarOpen ? 'block' : 'none',
    },
  },
}));

// MainContainer is the container of the main content of the page, it contains the ContentWrapper and Footer
export const MainContainer = styled.main(({ theme }) => ({
  flex: 'auto',
  width: 'calc(100vw - 70px)',
  margin: '0 auto auto 180px',
  overflow: 'hidden',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    margin: '0 auto',
    width: '100%',
    marginBottom: 22,
  },
}));

// ContentWrapper is the container of the main content of the page, it contains the children of the Layout component
export const ContentWrapper = styled.div(() => ({
  margin: '0 auto',
  marginTop: 72,
}));

// ContentContainer is the container of the main content of the page, All features should extend this container for starting their content
export const ContentContainer = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: 1190,
  margin: '0 auto',
  padding: '0 35px 60px',

  [`${mq.with({ theme }).until(screen.LG)}`]: {
    padding: '0 15px 22px 15px',
  },
}));
