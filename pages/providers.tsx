import { useIntl } from 'react-intl';
import { GetServerSideProps } from 'next';

import { Layout } from '@/core/components/Layout';

import { Providers } from '@/features/Providers';

import { wrapperServerSideProps } from '@/libs/next';

const ProvidersPage = () => {
  const { formatMessage } = useIntl();

  return (
    <Layout
      title={formatMessage({
        id: 'page.providers',
        defaultMessage: 'providers',
      })}
    >
      <Providers />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(() => ({ props: {} }));

export default ProvidersPage;
