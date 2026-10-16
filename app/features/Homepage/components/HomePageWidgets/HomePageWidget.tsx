import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { GetArticleResponse } from '@/core/domains/article';
import { RichText } from '@/core/components/RichText';
import { Flex } from '@/core/shared';
import { ButtonSize, ButtonVariant } from '@/core/shared/Button/Button.types';

import { theme } from '@/themes/main';

import { CTAButton, HeaderContainer, Title, WidgetCard } from './HomePageWidgets.styles';

export const HomePageWidget: FC<{ article: GetArticleResponse; isOdd: boolean }> = ({ article, isOdd = false }) => {
  return (
    <WidgetCard background={isOdd ? theme.rebrandingColors.gradients.red : theme.rebrandingColors.palette.dark[40]}>
      <Flex flexDirection="column" height="100%">
        <HeaderContainer>
          <Title>{article?.title?.contentText}</Title>
        </HeaderContainer>
        <RichText
          data={
            article?.body?.content?.map((c) => {
              if (c.type === 'button') {
                return {
                  ...c,
                  type: 'custom',
                  custom: (
                    <CTAButton
                      variant={isOdd ? ButtonVariant.Outlined : ButtonVariant.Filled}
                      href={c?.link || ''}
                      size={ButtonSize.Small}
                    >
                      <FormattedMessage id="widget.learnMore" defaultMessage="Learn More" />
                    </CTAButton>
                  ),
                };
              }

              return c;
            }) || []
          }
        />
      </Flex>
    </WidgetCard>
  );
};
