import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import { useIntl } from 'react-intl';

import { Layout } from '@/core/components/Layout';
import { getProviderMachineViews } from '@/core/domains/provider';

import { ProviderPage } from '@/features/ProviderPage';

import { wrapperServerSideProps } from '@/libs/next';

export default () => {
  const { formatMessage } = useIntl();

  return (
    <Layout
      title={formatMessage({
        id: 'page.providers',
        defaultMessage: 'Providers',
      })}
    >
      <ProviderPage />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ store, context }) => {
  const {
    query: { slug },
  } = context;

  try {
    if (typeof slug === 'string') {
      await store.dispatch(getProviderMachineViews.initiate(slug, { forceRefetch: true }));
    }

    return {
      props: {
        statusCode: 200,
      },
    };
  } catch (error) {
    let statusCode = 500;

    if (axios.isAxiosError(error)) {
      statusCode = (error as AxiosError).response?.status || 500;
    }

    return {
      props: {
        statusCode,
      },
    };
  }
});
