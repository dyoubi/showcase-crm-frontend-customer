import { GetServerSideProps } from 'next';
import axios, { AxiosError } from 'axios';
import { useIntl } from 'react-intl';

import { Layout } from '@/core/components/Layout';
import { getCategories } from '@/core/domains/category';
import { getMachineView } from '@/core/domains/machineView';

import { GamePage } from '@/features/GamePage';

import { wrapperServerSideProps } from '@/libs/next';

const Game = () => {
  const { formatMessage } = useIntl();

  return (
    <Layout
      title={formatMessage({
        id: 'page.game',
        defaultMessage: 'Game',
      })}
    >
      <GamePage />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ store, context }) => {
  const {
    query: { slug },
  } = context;

  try {
    if (typeof slug === 'string') {
      await store.dispatch(getMachineView.initiate({ slug }, { forceRefetch: true }));
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

export default Game;
