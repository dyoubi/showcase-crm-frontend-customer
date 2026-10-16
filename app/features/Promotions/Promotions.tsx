import React from 'react';
import { useIntl } from 'react-intl';

import { ContentContainer } from '@/core/components/Layout';
import { Promotion } from '@/core/domains/promotion';
import { URLDateFormatsByLanguage } from '@/core/constants/constants';

import { formatDateString } from '@/utils/date';

import { PromotionBox } from './components/PromotionBox';
import { PromotionBoxSkeleton } from './components/PromotionBox/PromotionBoxSkeleton';
import { PromotionGrid } from './Promotions.styles';
import { usePromotionsContext } from './context';

export const PromotionsPage = () => {
  const { promotions } = usePromotionsContext();

  const { locale } = useIntl();

  const urlDateFormat = URLDateFormatsByLanguage[locale as string] || URLDateFormatsByLanguage.default;

  // Show skeletons if promotions are not loaded yet
  if (!promotions || promotions.length === 0) {
    return (
      <ContentContainer>
        <PromotionGrid>
          {/* Show 4 skeleton items as placeholder */}
          <PromotionBoxSkeleton key="skeleton-1" />
          <PromotionBoxSkeleton key="skeleton-2" />
          <PromotionBoxSkeleton key="skeleton-3" />
          <PromotionBoxSkeleton key="skeleton-4" />
        </PromotionGrid>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <PromotionGrid>
        {promotions.map((promotionItem: Promotion) => (
          <PromotionBox
            key={promotionItem.key}
            promoKey={promotionItem.key}
            title={promotionItem.name}
            startDate={formatDateString(promotionItem.startDate, urlDateFormat)}
            endDate={formatDateString(promotionItem.endDate, urlDateFormat)}
          />
        ))}
      </PromotionGrid>
    </ContentContainer>
  );
};
