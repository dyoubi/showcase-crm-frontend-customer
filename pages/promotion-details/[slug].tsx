import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useIntl } from 'react-intl';

import { Layout } from '@/core/components/Layout';
import { getPromotion, PromotionItem } from '@/core/domains/promotion';
import { fileCache } from '@/core/cache/fileCache';

import { PromotionDetailsPage } from '@/features/PromotionDetails';
import { PromotionDetailsProvider } from '@/features/PromotionDetails/context';

import { getPromotionImage } from '@/utils/mediaHelpers';

import { wrapperServerSideProps } from '@/libs/next';

type PromotionDetailsSSRProps = {
  promotionDetails: any; // Using any to avoid serialization issues with complex PromotionItem type
};

const Page = ({ promotionDetails }: PromotionDetailsSSRProps) => {
  const { formatMessage } = useIntl();

  // Preload critical promotion images for better loading experience
  const preloadImageURL = promotionDetails?.key ? getPromotionImage(promotionDetails.key, 'header', true, 'en') : null;

  return (
    <>
      {preloadImageURL && (
        <Head>
          <link rel="preload" as="image" href={preloadImageURL} />
        </Head>
      )}
      <Layout
        title={formatMessage({
          id: 'page.promotionDetails',
          defaultMessage: 'Promotion Details',
        })}
      >
        <PromotionDetailsProvider promotionDetails={promotionDetails || undefined}>
          <PromotionDetailsPage />
        </PromotionDetailsProvider>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ store, context }) => {
  let promotionDetails: any;
  const {
    query: { slug, deviceType },
    locale,
  } = context;

  // Define a unique cache key based on relevant factors
  const cacheKey = `promotiondetailspage-props-${locale}-${deviceType}-${slug}`;

  // Try fetching from file cache first
  const cachedProps = fileCache.get<PromotionDetailsSSRProps>(cacheKey);

  if (cachedProps) {
    return {
      props: cachedProps,
    };
  }

  try {
    const { data } = await store.dispatch(
      getPromotion.initiate(
        { locale: locale as string, slug: slug as string, device: deviceType as 'mobile' | 'desktop' },
        { forceRefetch: true },
      ),
    );

    promotionDetails = data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('promotions server side props : ', error);

    return {
      props: {
        promotionDetails: null,
        statusCode: 500,
      },
    };
  }

  // Cache the fetched data for 1 hour for better performance
  const propsToCache: PromotionDetailsSSRProps = {
    promotionDetails,
  };

  fileCache.set<PromotionDetailsSSRProps>(cacheKey, propsToCache, 60000 * 60); // Cache for 1 hour

  return {
    props: propsToCache,
  };
});

export default Page;
