import { IconRotateRight } from '@/core/shared/Icons';
import { Text } from '@/core/components/Typography/Text';
import { Box } from '@/core/shared/Box';
import { useRecentSearches } from '@/core/hooks/useRecentSearches';

import { Item, Row, StyledIconClose } from './PreviousSearch.styles';

type PreviousSearchProps = {
  searchTerm: string;
  setQuery: (query: string) => void;
};

export const PreviousSearch = ({ searchTerm, setQuery }: PreviousSearchProps) => {
  const { savedSearches, removeItemFromHistory } = useRecentSearches(searchTerm);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {savedSearches?.map((query: string) => (
        <Row key={query}>
          <Item onClick={() => setQuery(query)}>
            <Box mr="xs">
              <IconRotateRight />
            </Box>
            <Text level="medium">{query}</Text>
          </Item>
          <StyledIconClose onClick={() => removeItemFromHistory(query)} />
        </Row>
      ))}
    </>
  );
};
