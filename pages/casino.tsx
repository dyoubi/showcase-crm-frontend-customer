import { useIntl } from 'react-intl';
import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';

import { Layout } from '@/core/components/Layout';
import { getMachinesViews } from '@/core/domains/machineView';

import { CasinoPage } from '@/features/CasinoPage';

import { wrapperServerSideProps } from '@/libs/next';

export const Casino = () => {
  const { formatMessage } = useIntl();

  return (
    <Layout
      title={formatMessage({
        id: 'casino',
        defaultMessage: 'Casino',
      })}
    >
      <CasinoPage />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ store }) => {
  try {
    await store.dispatch(getMachinesViews.initiate(undefined, { forceRefetch: true }));

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

export default Casino;
