import { GetServerSideProps } from 'next';
import { useIntl } from 'react-intl';
import { getSession } from 'next-auth/react';

import { Layout } from '@/core/components/Layout';
import { getArticle, GetArticleResponse } from '@/core/domains/article';
import { CarouselItem, getCarousels, GetCarouselsResponse } from '@/core/domains/carousel';
import { getPromotions, GetPromotionsResponse } from '@/core/domains/promotion';
import { useModalRouteHandler } from '@/core/hooks/useModalRouteHandler';

import { Homepage } from '@/features/Homepage';
import { HomePageContextProps, HomePageProvider } from '@/features/Homepage/context/HomePageContext'; // Import context props type
import { HomePageWidgetArticleKeys } from '@/features/Homepage/components/HomePageWidgets/HomePageWidgets.constants';
// Corrected import path
import { getSliderItems } from '@/features/Homepage/context/utils';

import { wrapperServerSideProps } from '@/libs/next';

// Assuming GetArticleResponse, GetCarouselsResponse, GetPromotionsResponse,
// GetCarouselContentResponse are serializable or handled by wrapperServerSideProps.
// If not, define specific serializable types.
type HomePageSSRProps = Pick<
  HomePageContextProps,
  'ctaArticles' | 'ssrCarouselsData' | 'ssrPromotionsData' | 'ssrSliderItems' | 'ssrIsLogged'
>;

const Page = (props: HomePageSSRProps) => {
  const { formatMessage } = useIntl();

  useModalRouteHandler();

  return (
    <Layout
      title={formatMessage({
        id: 'page.home',
        defaultMessage: 'Home',
      })}
    >
      {/* Pass fetched data down */}
      <HomePageProvider {...props}>
        <Homepage />
      </HomePageProvider>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ store, context }) => {
  const {
    locale = 'en',
    query: { deviceType },
  } = context;
  const session = await getSession(context);
  const isLogged = !!session;

  let ctaArticles: Array<GetArticleResponse> = [];
  let carouselsData: GetCarouselsResponse = [];
  let promotionsData: GetPromotionsResponse = [];
  let allSliderItems: Array<CarouselItem> = [];

  try {
    // Fetch articles, carousels, and promotions in parallel
    const articlePromises = HomePageWidgetArticleKeys.map((key) =>
      store.dispatch(getArticle.initiate({ articleKey: key, locale: locale as 'fr' | 'en' }, { forceRefetch: false })),
    );
    const carouselsPromise = store.dispatch(getCarousels.initiate(undefined, { forceRefetch: true }));
    const promotionsPromise = store.dispatch(getPromotions.initiate(undefined, { forceRefetch: true }));

    const [carouselsRes, promotionsRes, ...articlesResResult] = await Promise.all([
      carouselsPromise,
      promotionsPromise,
      ...articlePromises,
    ]);

    // Process articles
    ctaArticles = articlesResResult
      .map((response) => response.data)
      ?.filter((data): data is GetArticleResponse => !!data); // Type guard

    // Process carousels and promotions
    if (carouselsRes.data) {
      carouselsData = carouselsRes.data;
    }

    if (promotionsRes.data) {
      promotionsData = promotionsRes.data;
    }

    // Determine the first slider item and fetch its content URL
    if (carouselsData) {
      const sliderItems = getSliderItems(carouselsData, isLogged, deviceType as string, locale);

      if (sliderItems.length > 0) {
        allSliderItems = sliderItems;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('getServerSideProps error: ', error);
    // Decide if you want to cache errors or return without caching

    return {
      props: {
        ctaArticles: [],
        ssrCarouselsData: [],
        ssrPromotionsData: [],
        ssrSliderItems: [],
        ssrIsLogged: isLogged,
        statusCode: 500,
      },
    };
  }

  // Construct the props object
  const propsToCache: HomePageSSRProps = {
    ctaArticles,
    ssrCarouselsData: carouselsData,
    ssrPromotionsData: promotionsData,
    ssrSliderItems: allSliderItems,
    ssrIsLogged: isLogged,
  };

  return {
    props: propsToCache as any,
  };
});

export default Page;
