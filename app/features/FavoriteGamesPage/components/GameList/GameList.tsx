import { FC, useState } from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { routePaths } from '@/core/constants/routes';
import { FilterBar } from '@/core/components/FilterBar';
import { Thumbnail } from '@/core/components/Thumbnail';
import { Box } from '@/core/shared/Box';
import { Button } from '@/core/shared/Button';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';
import { Divider } from '@/core/shared/Divider';
import { Text } from '@/core/components/Typography';

import { ButtonContainer, GameItemWrapper, GameListContainer, GamesContainer } from './GameList.styles';
import { GameListProps } from './GameList.types';

export const GameList: FC<GameListProps> = ({ data }) => {
  const { isTabletOrPhone } = useBreakpoints();
  const defaultThumbnailsNo = isTabletOrPhone ? 12 : 18;
  const loadMoreNo = isTabletOrPhone ? 6 : 18;
  // CBP-110: this boolean is for hiding the filterbar. later in future, when the component is ready to use, we can remove this boolean
  const isFilterBarVisible = true;

  const [visibleItems, setVisibleItems] = useState(defaultThumbnailsNo);

  const loadMore = () => {
    setVisibleItems(visibleItems + loadMoreNo);
  };

  return (
    <GameListContainer>
      <GamesContainer>
        {[...data].splice(0, Math.min(data.length, visibleItems)).map((item) => (
          <GameItemWrapper key={item.id}>
            <Link href={`${routePaths.game}/${item.key}`}>
              <Thumbnail
                slug={item.key}
                title={item.title}
                src={{
                  desktop: item.image?.desktop?.url,
                  mobile: item.image?.mobile?.url,
                }}
                itemId={item.id}
              />
            </Link>
          </GameItemWrapper>
        ))}
      </GamesContainer>
      {data.length > visibleItems ? (
        <ButtonContainer>
          <Divider width={230} mt="s" mb="xs" />
          <Button color={ButtonColor.Tertiary} size={ButtonSize.Small} onClick={loadMore}>
            <Text level="small">
              <FormattedMessage id="categoryLoadMore" defaultMessage="Load More" />
            </Text>
          </Button>
        </ButtonContainer>
      ) : (
        <Box mb="m" />
      )}
    </GameListContainer>
  );
};
