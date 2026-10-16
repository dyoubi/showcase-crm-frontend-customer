import { useEffect, useState } from 'react';

import { LocalStorage } from '@/core/constants/constants';

import { getItemFromLocalStorage, storeItemInLocalStorage } from '@/utils/localStorage';

// saves most recent search queries to local storage and returns an array of the last three queries

export const useRecentSearches = (query: string) => {
  const [recentResults, setRecentResults] = useState<Array<string>>(getItemFromLocalStorage(LocalStorage.SEARCH) || []);

  const removeItemFromHistory = (searchTerm: string) => {
    const updatedList = recentResults.filter((result) => searchTerm !== result);

    storeItemInLocalStorage(LocalStorage.SEARCH, updatedList);
    setRecentResults(updatedList);
  };

  useEffect(() => {
    if (query.length) {
      const updatedList = [query, ...recentResults.filter((result) => query !== result)];

      storeItemInLocalStorage(LocalStorage.SEARCH, updatedList);
      setRecentResults(updatedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { savedSearches: recentResults.slice(0, 3), removeItemFromHistory };
};
