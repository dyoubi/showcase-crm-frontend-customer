import { createContext, FC, ReactNode, useContext, useMemo } from 'react';

import { GetArticleResponse } from '@/core/domains/article';
import { CarouselItem, GetCarouselsResponse } from '@/core/domains/carousel';
import { GetPromotionsResponse } from '@/core/domains/promotion';

// Exporting the props interface for use in pages/index.tsx
export interface HomePageContextProps {
  ctaArticles: Array<GetArticleResponse>;
  ssrCarouselsData: GetCarouselsResponse | null;
  ssrPromotionsData: GetPromotionsResponse | null;
  ssrSliderItems: Array<CarouselItem>;
  ssrIsLogged: boolean;
}

const HomePageContext = createContext<HomePageContextProps | undefined>(undefined);

interface HomePageProviderProps extends HomePageContextProps {
  children: ReactNode;
}

export const HomePageProvider: FC<HomePageProviderProps> = ({
  children,
  ctaArticles,
  ssrCarouselsData,
  ssrPromotionsData,
  ssrSliderItems,
  ssrIsLogged,
}) => {
  const value = useMemo(
    () => ({
      ctaArticles,
      ssrCarouselsData,
      ssrPromotionsData,
      ssrSliderItems,
      ssrIsLogged,
    }),
    [ctaArticles, ssrCarouselsData, ssrPromotionsData, ssrSliderItems, ssrIsLogged],
  );

  return <HomePageContext.Provider value={value}>{children}</HomePageContext.Provider>;
};

export const useHomePageContext = () => {
  const context = useContext(HomePageContext);

  if (context === undefined) {
    throw new Error('useHomePageContext must be used within a HomePageProvider');
  }

  return context;
};
