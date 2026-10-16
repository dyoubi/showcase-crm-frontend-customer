import { SortBy } from '@/core/components/SortBy/SortBy';

import { SearchBar } from '../SearchBar';
import * as S from './styles';

export const SearchMachineViewInput = () => {
  return (
    <S.SearchBarContainer>
      <SearchBar />
      <SortBy />
    </S.SearchBarContainer>
  );
};
