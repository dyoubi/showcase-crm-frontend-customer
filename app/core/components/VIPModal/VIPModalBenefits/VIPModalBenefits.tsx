import { FC } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Accordion } from '@/core/components/Accordion';
import { IconBlockExpert, IconEarlyAdopter, IconLuckyMiner, IconSatoshiEnthusiast } from '@/core/shared/Icons';

import { VIP_TIERS } from '@/features/VipPage/components/VipSlider/constants';
import { VIPCard } from '@/features/VipPage/components/VipSlider/VipCard/VipCard';

import { VIPModalBenefitsContainer } from './VIPModalBenefits.styles';

export const VIPModalBenefits: FC = () => {
  const { formatMessage } = useIntl();

  return (
    <VIPModalBenefitsContainer>
      {VIP_TIERS.map((article) => (
        <Accordion
          key={article.id}
          title={formatMessage({
            id: article.titleDefault,
            defaultMessage: article.title,
          })}
          iconLeft={article.iconSmall}
        >
          <VIPCard {...article} />
        </Accordion>
      ))}
    </VIPModalBenefitsContainer>
  );
};
