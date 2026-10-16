import { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { useOnClickOutside } from '@/core/hooks/useOnClickOutside';
import { IconLoader, IconSearch } from '@/core/shared/Icons';
import { FieldVariant } from '@/core/shared/FeedbackMessage';
import { Box } from '@/core/shared/Box';
import { Text } from '@/core/components/Typography/Text';
import { Spacer } from '@/core/shared/Spacer';

import { RecommendedCarousel } from './parts/RecommendedCarousel';
import { ResultCarousel } from './parts/ResultCarousel';
import { PreviousSearch } from './parts/PreviousSearch';
import { ResultContainer, SearchContainer, StatusBox, StyledSearchBar } from './SearchBar.styles';
import { useSearch } from './hooks/useSearch';
import { SearchBarProps } from './SearchBar.types';

export const SearchBar = ({ customSlidesToShow }: SearchBarProps) => {
  const { formatMessage } = useIntl();
  const { isTabletOrPhone } = useBreakpoints();
  const [query, setQuery] = useState('');
  const [isListVisible, setIsListVisible] = useState(false);
  const searchBarRef = useRef(null);

  useOnClickOutside(searchBarRef, () => setIsListVisible(false));

  const { results, isLoading, debouncedValue } = useSearch(query);
  const hasResults = (results?.length || 0) > 0;

  return (
    <SearchContainer ref={searchBarRef}>
      <StyledSearchBar
        placeholder={formatMessage({
          defaultMessage: 'Search your game',
          id: 'search.placeholder',
        })}
        iconLeft={<IconSearch />}
        value={query}
        selectable
        variant={FieldVariant.Default}
        isListVisible={isListVisible}
        onFocus={() => setIsListVisible(true)}
        onChange={(event) => setQuery(event.target.value)}
      />
      {isListVisible && (
        <ResultContainer>
          {!query && <PreviousSearch searchTerm={debouncedValue} setQuery={(searchQuery) => setQuery(searchQuery)} />}
          {isLoading && (
            <StatusBox>
              <IconLoader size="l" />
              <Spacer size="xs" />
              <Text level="small">
                <FormattedMessage id="global.loading" defaultMessage="Loading" />
              </Text>
            </StatusBox>
          )}
          {!hasResults && !isLoading && (
            <StatusBox>
              <Text level="small">
                <FormattedMessage id="search.noResults" defaultMessage="No results found" />
              </Text>
            </StatusBox>
          )}
          {hasResults && !isLoading && (
            <Box mb="m">
              <ResultCarousel results={results} customSlidesToShow={customSlidesToShow} />
            </Box>
          )}
          {/* <Box mb="xxs" mt="xs">
            <RecommendedCarousel customSlidesToShow={customSlidesToShow} />
          </Box> */}
        </ResultContainer>
      )}
    </SearchContainer>
  );
};
