import { useIntl } from 'react-intl';

import { Card, Flex } from '@/core/shared';
import { GetArticleSliceParams, useGetArticleQuery } from '@/core/domains/article';
import { RichText } from '@/core/components/RichText';

import { VipLevel } from '../VipSlider.types';
import { CardContainer, HeaderContainer, SubTitle, Title } from './VIPCard.styles';

export const VIPCard = ({ articleKey, title, icon, financialDetails, featureColor }: VipLevel) => {
  const { locale } = useIntl();
  const { data } = useGetArticleQuery({
    articleKey,
    locale: locale as GetArticleSliceParams['locale'],
  });

  return (
    <CardContainer borderColor={featureColor}>
      <Flex flexDirection="column" height="100%">
        <HeaderContainer>
          {icon}
          <Title>{title}</Title>
          <SubTitle>{financialDetails}</SubTitle>
        </HeaderContainer>
        <RichText data={data?.body?.content?.map((t) => ({ ...t, type: 'paragraph' }))} />
      </Flex>
    </CardContainer>
  );
};
