import { IconFilter } from '@/core/shared/Icons';

import { FilterBarContainer, InnerContainer, StyledText } from './FilterBar.styles';
import { Select } from '../../shared/Select';
import { SelectSize } from '../../shared/Select/Select.types';
import { useBreakpoints } from '../../hooks/useBreakpoints';
import { FilterBarProps } from './FilterBar.types';

export const FilterBar = ({ filterOptions, onFilterSelect, onSortSelect, sortOptions }: FilterBarProps) => {
  const { isPhone, isTabletOrPhone } = useBreakpoints();

  return (
    <FilterBarContainer>
      <InnerContainer>
        {!isPhone && (
          <>
            {!isTabletOrPhone && <IconFilter data-testid="filter-icon" />}
            <StyledText level="medium">Filter By</StyledText>
          </>
        )}
        <Select
          size={SelectSize.Small}
          options={filterOptions}
          defaultValue={filterOptions[0]}
          onChange={onFilterSelect}
          className="filter-selector"
        />
      </InnerContainer>
      <InnerContainer>
        {!isPhone && (
          <>
            {!isTabletOrPhone && <IconFilter />}
            <StyledText level="medium">Sort By</StyledText>
          </>
        )}
        <Select
          size={SelectSize.Small}
          options={sortOptions}
          defaultValue={sortOptions[0]}
          onChange={onSortSelect}
          className="sort-selector"
        />
      </InnerContainer>
    </FilterBarContainer>
  );
};
