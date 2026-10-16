import { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';

import { ContentWrapper, MainContainer, MainWrapper, PageWrapper } from '@/core/components/Layout/Layout.styles';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { DATA_TEST_IDS } from '@/core/constants/constants';

import { Footer } from '../Footer';
import { LateralMenu } from '../LateralMenu';
import { LayoutProps } from './Layout.types';
import { BottomMenu } from '../BottomMenu';

// Dynamically import TopMenu to prevent hydration issues with navigation progress
const TopMenu = dynamic(() => import('../TopMenu').then((mod) => ({ default: mod.TopMenu })), {
  ssr: false,
  loading: () => <div style={{ height: '61px', background: '#150F30' }} />, // Placeholder with same height
});

export const Layout = ({ children, title }: LayoutProps) => {
  const isLoggedIn = useIsLogged();
  const [isLateralMenuOpen, setLateralMenuOpen] = useState(false);

  const titleTxt = `BitPlay - ${title}` as const;

  return (
    <PageWrapper>
      <Head>
        <title key="title">{titleTxt}</title>
      </Head>
      <Script
        id="license-script"
        src="https://f9ae909e-099b-44e5-8486-4e06f6253d9c.snippet.anjouangaming.org/anj-seal.js"
        strategy="afterInteractive"
      />
      <TopMenu
        isLogged={isLoggedIn}
        data-testid={isLoggedIn ? DATA_TEST_IDS.CONNECTED_NAV_BAR : DATA_TEST_IDS.OFFLINE_NAV_BAR}
      />
      <MainWrapper sidebarOpen={isLateralMenuOpen}>
        <LateralMenu setIsOpen={setLateralMenuOpen} />
        <MainContainer>
          {/**
           * WARNING BE CAREFUL ITS FORBIDDEN TO MAKE
           * AN CONDITIONNAL RENDERING AROUND CHILDREN
           * IF YOU DOES THE SSR CAN BE AFFECTED AND THIS
           * ERROR CAN HAPPEND :
           * https://nextjs.org/docs/messages/react-hydration-error
           * */}
          <ContentWrapper>{children}</ContentWrapper>
          <Footer />
        </MainContainer>
      </MainWrapper>
      <BottomMenu setMenuOpen={(isOpen: boolean) => setLateralMenuOpen(isOpen)} />
    </PageWrapper>
  );
};
