import axios, { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';

import { Layout } from '@/core/components/Layout';
import { getCategory } from '@/core/domains/category';

import { CategoryPage } from '@/features/CategoryPage';

import { wrapperServerSideProps } from '@/libs/next';

export const Category = () => (
  <Layout title="Game Category">
    <CategoryPage />
  </Layout>
);

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ store, context }) => {
  try {
    const { slug } = context.query;

    await store.dispatch(getCategory.initiate({ slug }, { forceRefetch: true }));

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

export default Category;
