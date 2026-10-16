import { FC, useEffect, useState } from 'react';
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
  const isFilterBarVisible = false;

  const [numOfVisibleItems, setNumOfVisibleItems] = useState(defaultThumbnailsNo);
  const [hasLoadMore, setHasLoadMore] = useState(true);

  useEffect(() => {
    setHasLoadMore(numOfVisibleItems < data.length);
  }, [numOfVisibleItems, data]);

  const loadMore = () => {
    setNumOfVisibleItems(numOfVisibleItems + loadMoreNo);
  };

  return (
    <GameListContainer>
      {isFilterBarVisible && (
        <Box mb="s" data-mocked>
          <FilterBar
            filterOptions={[
              {
                label: 'Option 1',
                value: 'option-1',
              },
            ]}
            onFilterSelect={() => undefined}
            onSortSelect={() => undefined}
            sortOptions={[
              {
                label: 'Option 1',
                value: 'option-1',
              },
            ]}
          />
        </Box>
      )}
      <GamesContainer isEmpty={data.length === 0}>
        {data.length === 0 && (
          <FormattedMessage id="providerSelector.noResults" defaultMessage="No results found with selected providers" />
        )}
        {[...data].splice(0, Math.min(data.length, numOfVisibleItems)).map((item, index) => (
          <GameItemWrapper key={item.id}>
            <Link href={`${routePaths.game}/${item.key}`}>
              <Thumbnail
                slug={item.key}
                title={item.title}
                src={{
                  desktop: item.image?.desktop?.url,
                  mobile: item.image?.mobile?.url,
                }}
                data-game-id={item.id}
                data-game-title={item.title}
                data-game-slug={item.key}
                data-game-position={index + 1}
                itemId={item.id}
              />
            </Link>
          </GameItemWrapper>
        ))}
      </GamesContainer>
      {hasLoadMore ? (
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
