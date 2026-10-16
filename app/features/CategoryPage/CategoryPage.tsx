import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import { Box } from '@/core/shared/Box';
import { ContentContainer } from '@/core/components/Layout';
import { ProvidersCarousel } from '@/core/components/ProvidersCarousel';
import { SearchBar } from '@/core/components/SearchBar';
// import { MainPageBets } from '@/core/components/MainPageBets';
import { MenuButtonGroup } from '@/core/components/MenuButtonGroup/MenuButtonGroup';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { Category, useGetCategoriesQuery, useGetCategoryQuery } from '@/core/domains/category';
import { SortBy } from '@/core/components/SortBy/SortBy';
import { useMachinesSort } from '@/core/hooks/useMachinesSort';
import { ProviderSelector } from '@/core/components/ProviderSelector/ProviderSelector';
import { Button, Flex } from '@/core/shared';
import { GameList } from '@/core/components/GamesList/components/GameList';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';
import { IconChevronDown } from '@/core/shared/Icons';
import { FilterModal } from '@/core/components/FilterModal/FilterModal';

import { SearchBarContainer, SliderContainer } from './CategoryPage.styles';
import { categoryList } from './CategoryPageItemList';
import { CategorySlider } from './components/CategoryPageSlider';

export const CategoryPage = () => {
  const { isTabletOrPhone } = useBreakpoints();
  const {
    query: { slug: categorySlug, sortBy },
    asPath,
  } = useRouter();

  const { data: category } = useGetCategoryQuery({
    slug: categorySlug as string,
  });

  const [selectedProviders, setSelectedProviders] = useState<Array<string>>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const { key, machinesViews = [] } = category || {};

  const filteredMachines = useMemo(() => {
    let filtered = machinesViews;

    if (selectedProviders.length > 0) {
      filtered = machinesViews.filter((machineView) =>
        selectedProviders.includes(machineView.provider?.toLowerCase() ?? ''),
      );
    }

    return filtered;
  }, [machinesViews, selectedProviders]);

  const sortedAndFilteredMachines = useMachinesSort(filteredMachines, sortBy);

  const filterProviders = (providerNameArray: Array<string>) => {
    setIsFilterModalOpen(false);
    setSelectedProviders(providerNameArray);
  };

  return (
    <ContentContainer>
      <Box mb="m">
        <SliderContainer>
          <CategorySlider />
        </SliderContainer>
      </Box>
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
