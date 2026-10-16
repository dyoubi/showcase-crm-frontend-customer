import { GetServerSideProps } from 'next';
import { FormattedMessage, useIntl } from 'react-intl';

import { Layout } from '@/core/components/Layout';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { useRedirectIfNotLogged } from '@/core/hooks/useRedirectIfNotLogged';
import { NeedAuthMessage } from '@/core/components/NeedAuthMessage';
import { NestedLayout } from '@/core/components/Layout/NestedLayout';
import { settingsMenu } from '@/core/constants/pageMenu';

import { Preferences } from '@/features/Settings';

import { wrapperServerSideProps } from '@/libs/next';

const PreferencesPage = () => {
  const { formatMessage } = useIntl();
  const isLogged = useIsLogged();

  useRedirectIfNotLogged(isLogged);

  return (
    <Layout
      title={formatMessage({
        id: 'page.settings',
        defaultMessage: 'Settings',
      })}
    >
      {isLogged ? (
        <NestedLayout
          title={<FormattedMessage id="page.settings" defaultMessage="Settings" />}
          menuItems={settingsMenu}
        >
          {/* <Preferences /> */}
          <div />
        </NestedLayout>
      ) : (
        <NeedAuthMessage />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(() => ({
  props: {
    env: {
      NEXT_PUBLIC_BACKEND_URL_INTERNAL: process.env.NEXT_PUBLIC_BACKEND_URL_INTERNAL,
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
      NEXT_AUTH_API_CLIENT_SECRET: process.env.NEXT_AUTH_API_CLIENT_SECRET,
      NEXT_AUTH_API_CONNECTION: process.env.NEXT_AUTH_API_CONNECTION,
    },
  },
}));

export default PreferencesPage;
