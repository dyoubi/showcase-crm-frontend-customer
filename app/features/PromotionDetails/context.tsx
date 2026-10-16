import React, { createContext, ReactNode, useContext } from 'react';

import { PromotionItem } from '@/core/domains/promotion';

export type PromotionDetailsContextType = {
  promotionDetails: PromotionItem | undefined; // Using any to match the serialized props
  startDate?: string;
  endDate?: string;
};

const PromotionDetailsContext = createContext<PromotionDetailsContextType | undefined>(undefined);

export const PromotionDetailsProvider = ({
  children,
  promotionDetails,
  startDate,
  endDate,
}: {
  children: ReactNode;
  promotionDetails: PromotionItem | undefined;
  startDate?: string;
  endDate?: string;
}) => {
  const value = React.useMemo(() => ({ promotionDetails, startDate, endDate }), [promotionDetails, startDate, endDate]);

  return <PromotionDetailsContext.Provider value={value}>{children}</PromotionDetailsContext.Provider>;
};

export const usePromotionDetailsContext = (): PromotionDetailsContextType => {
  const context = useContext(PromotionDetailsContext);

  if (context === undefined) {
    return {
      promotionDetails: undefined,
    };
  }

  return context;
};
