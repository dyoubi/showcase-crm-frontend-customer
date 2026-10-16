import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

// import { MainPageBets } from '@/core/components/MainPageBets';
import { Box } from '@/core/shared/Box';
import { ContentContainer } from '@/core/components/Layout';
import { ProvidersCarousel } from '@/core/components/ProvidersCarousel';
import { SearchBar } from '@/core/components/SearchBar';
import { MenuButtonGroup } from '@/core/components/MenuButtonGroup/MenuButtonGroup';
import { ProviderSelector } from '@/core/components/ProviderSelector/ProviderSelector';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useGetMachinesViewsQuery } from '@/core/domains/machineView';
import { SortBy } from '@/core/components/SortBy/SortBy';
import { useMachinesSort } from '@/core/hooks/useMachinesSort';
import { Button, Flex } from '@/core/shared';
import { GameList } from '@/core/components/GamesList/components/GameList';
import { IconChevronDown } from '@/core/shared/Icons';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';
import { FilterModal } from '@/core/components/FilterModal/FilterModal';

import { SearchBarContainer } from './CasinoPage.styles';
import { categoryList } from '../CategoryPage/CategoryPageItemList';

export const CasinoPage = () => {
  const { isTabletOrPhone } = useBreakpoints();
  const {
    query: { sortBy },
    asPath,
  } = useRouter();
  const { data: games = [] } = useGetMachinesViewsQuery(undefined);

  const [selectedProviders, setSelectedProviders] = useState<Array<string>>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const filteredMachines = useMemo(() => {
    let filtered = games;

    if (selectedProviders.length > 0) {
      filtered = games.filter((game) => selectedProviders.includes(game.provider?.toLowerCase() ?? ''));
    }

    return filtered;
  }, [games, selectedProviders]);

  const sortedAndFilteredMachines = useMachinesSort(filteredMachines, sortBy);
  const filterProviders = (providerNameArray: Array<string>) => {
    setIsFilterModalOpen(false);
    setSelectedProviders(providerNameArray);
  };

  return (
    <ContentContainer>
      {isTabletOrPhone && <MenuButtonGroup currentPath={asPath} menuList={categoryList} />}

      <SearchBarContainer>
        <SearchBar />
        {isTabletOrPhone ? (
          <Button size={ButtonSize.Small} color={ButtonColor.Tertiary} onClick={() => setIsFilterModalOpen(true)}>
            <Flex gap={20}>
              <FormattedMessage id="filter" defaultMessage="Filter" />
              <IconChevronDown size="s" />
            </Flex>
          </Button>
        ) : (
          <Flex alignItems="center" width="100%">
            <SortBy />
            <ProviderSelector onFilter={filterProviders} />
          </Flex>
        )}
      </SearchBarContainer>

      <GameList data={sortedAndFilteredMachines || []} />
      <Box data-mocked>
        <ProvidersCarousel />
      </Box>
      <FilterModal isOpen={isFilterModalOpen} setIsOpen={setIsFilterModalOpen} onSubmit={filterProviders} />
      {/* // TODO @BETS: This will be implemented in a different ticket. */}
      {/* <Box mt="l">
        <MainPageBets />
      </Box> */}
    </ContentContainer>
  );
};
