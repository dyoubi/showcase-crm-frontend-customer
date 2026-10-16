import { useIntl } from 'react-intl';

import { GetArticleSliceParams, useGetArticleQuery } from '@/core/domains/article';
import { RichText } from '@/core/components/RichText';
import { ContentContainer } from '@/core/components/Layout';

import { VipSlider } from './components/VipSlider/VipSlider';
import { BANNERTEXT_ARTICLE_SLUG } from './constants';
import { VipPageImageContainer } from './VipPage.styles';

export const VipPage = () => {
  const { locale } = useIntl();

  const { data } = useGetArticleQuery({
    articleKey: BANNERTEXT_ARTICLE_SLUG,
    locale: locale as GetArticleSliceParams['locale'],
  });

  return (
    <ContentContainer>
      <VipPageImageContainer>
        <div className="banner-overlay-text">
          <RichText data={data?.body?.content} />
        </div>
      </VipPageImageContainer>
      <VipSlider />
    </ContentContainer>
  );
};
