import React, { createContext, ReactNode, useContext } from 'react';

import { GetPromotionsResponse } from '@/core/domains/promotion';

export type PromotionsContextType = {
  promotions: GetPromotionsResponse;
};

const PromotionsContext = createContext<PromotionsContextType | undefined>(undefined);

export const PromotionsProvider = ({
  children,
  promotions,
}: {
  children: ReactNode;
  promotions: GetPromotionsResponse;
}) => {
  const value = React.useMemo(() => ({ promotions }), [promotions]);

  return <PromotionsContext.Provider value={value}>{children}</PromotionsContext.Provider>;
};

export const usePromotionsContext = (): PromotionsContextType => {
  const context = useContext(PromotionsContext);

  if (context === undefined) {
    return {
      promotions: [],
    };
  }

  return context;
};
