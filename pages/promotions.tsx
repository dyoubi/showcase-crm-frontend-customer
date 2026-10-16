import { GetServerSideProps } from 'next';
import { useIntl } from 'react-intl';
import Head from 'next/head';

import { Layout } from '@/core/components/Layout';
import { getPromotions, GetPromotionsResponse } from '@/core/domains/promotion';
import { fileCache } from '@/core/cache/fileCache';

import { PromotionsPage } from '@/features/Promotions';
import { PromotionsProvider } from '@/features/Promotions/context';

import { wrapperServerSideProps } from '@/libs/next';

type PromotionsSSRProps = {
  promotions: GetPromotionsResponse;
  hasError?: boolean;
};

const PromotionsAllPage = ({ promotions = [], hasError = false }: PromotionsSSRProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Head>
        {/* DNS prefetch for external image domains */}
        <link rel="dns-prefetch" href="//content.egamingchain.io" />
        <link rel="dns-prefetch" href="//media-server.egamingchain.io" />
      </Head>
      <Layout
        title={formatMessage({
          id: 'page.promotions',
          defaultMessage: 'Promotions',
        })}
      >
        <PromotionsProvider promotions={promotions}>
          <PromotionsPage />
        </PromotionsProvider>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ store }) => {
  let promotions: any = [];

  // Define a unique cache key based on relevant factors
  const cacheKey = `promotionsallpage-props`;

  // Try fetching from file cache first
  const cachedProps = fileCache.get<PromotionsSSRProps>(cacheKey);

  if (cachedProps) {
    return {
      props: cachedProps,
    };
  }

  try {
    const { data } = await store.dispatch(getPromotions.initiate(undefined, { forceRefetch: true }));

    promotions = data?.filter((item) => item.active).sort((a, b) => a?.key?.localeCompare(b?.key)) || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('promotions server side props : ', error);

    // Return empty promotions array but don't return an error status code
    // This allows the page to still render with skeleton states
    const propsToCache: PromotionsSSRProps = {
      promotions: [],
      hasError: true,
    };

    return {
      props: propsToCache,
    };
  }

  // Cache the fetched data
  const propsToCache: PromotionsSSRProps = {
    promotions,
    hasError: false,
  };

  fileCache.set<PromotionsSSRProps>(cacheKey, propsToCache, 60 * 1000); // Cache for 1 minute

  return {
    props: propsToCache as any,
  };
});
export default PromotionsAllPage;
