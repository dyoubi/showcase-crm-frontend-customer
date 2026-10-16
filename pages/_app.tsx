/* eslint-disable react/no-unknown-property */
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Session } from 'next-auth';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';

import { wrapper } from '@/core/store/store';
import { Providers } from '@/core/components/Providers';
import { CookieConsent } from '@/core/components/CookieConsent/CookieConsent';

import ErrorPage from './_error';

interface Props {
  statusCode?: number;
  session?: Session | null;
  isMobileDevice: boolean;
}

// This implements the default behavior from styled-components v5
const shouldForwardProp = (propName: string, target: any): boolean => {
  if (typeof target === 'string') {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }

  // For other elements, forward all props
  return true;
};

const MyApp = ({ Component, ...rest }: AppProps<Props>) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const pageProps = props?.pageProps;

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <Providers store={store} session={rest.pageProps.session}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
          <style jsx global>{`
            html {
              font-family: 'loos-wide', sans-serif;
            }
          `}</style>
        </Head>
        {(!pageProps?.statusCode || pageProps?.statusCode === 200) && <Component {...pageProps} />}
        {pageProps?.statusCode && pageProps.statusCode !== 200 && <ErrorPage statusCode={pageProps.statusCode} />}
        <CookieConsent />
      </Providers>
    </StyleSheetManager>
  );
};

export default MyApp;
