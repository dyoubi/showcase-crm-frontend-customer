import { ReactNode, useEffect, useState } from 'react';
import { EnhancedStore } from '@reduxjs/toolkit';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { ThemeProvider } from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';

import { Translation } from '@/core/components/Translation';
import { AppSession } from '@/core/components/AppSession';
import { DisplayModalProvider } from '@/core/components/DisplayModalProvider';
import { useTheme } from '@/core/hooks/useTheme';
import { IntercomProvider } from '@/core/components/IntercomProvider';

import { NotificationProvider } from '@/utils/notifications/notification-context';
import { DisplayMockedData } from '@/utils/DisplayMockedData';

import { GlobalStyle } from '@/themes/globalStyles';

import { MediaContextProvider } from '@/libs/media-query';
import { useIsMobileDevice } from '@/libs/media-query/hooks';

interface ProvidersProps {
  children: ReactNode;
  session?: Session | null;
  store: EnhancedStore;
}

// Client-side only MediaContextProvider to prevent hydration issues
const ClientMediaContextProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const isMobileDevice = useIsMobileDevice();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div style={{ display: 'none' }}>{children}</div>;
  }

  return <MediaContextProvider isMobileDevice={isMobileDevice}>{children}</MediaContextProvider>;
};

export const Providers = ({ session, store, children }: ProvidersProps) => {
  const theme = useTheme();

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <AppSession>
          <ThemeProvider theme={theme}>
            <IntercomProvider>
              <CookiesProvider>
                <ClientMediaContextProvider>
                  <DisplayMockedData />
                  <GlobalStyle theme={theme} />
                  <Translation>
                    <NotificationProvider>
                      <DisplayModalProvider>{children}</DisplayModalProvider>
                    </NotificationProvider>
                  </Translation>
                </ClientMediaContextProvider>
              </CookiesProvider>
            </IntercomProvider>
          </ThemeProvider>
        </AppSession>
      </Provider>
    </SessionProvider>
  );
};
