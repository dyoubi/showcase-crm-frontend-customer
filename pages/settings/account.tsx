import { FormattedMessage, useIntl } from 'react-intl';
import { GetServerSideProps } from 'next';

import { Layout } from '@/core/components/Layout';
import { useIsLogged } from '@/core/hooks/useIsLogged';
import { NeedAuthMessage } from '@/core/components/NeedAuthMessage';
import { NestedLayout } from '@/core/components/Layout/NestedLayout';
import { settingsMenu } from '@/core/constants/pageMenu';
import { useRedirectIfNotLogged } from '@/core/hooks/useRedirectIfNotLogged';

import { Account } from '@/features/Settings/Account';

import { wrapperServerSideProps } from '@/libs/next';

const AccountPage = () => {
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
          <Account />
        </NestedLayout>
      ) : (
        <NeedAuthMessage />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(() => ({ props: {} }));

export default AccountPage;
