import { useSearchMachinesViewsQuery } from '@/core/domains/machineView';
import { useDebounce } from '@/core/hooks/useDebounce';

export const useSearch = (value: string) => {
  const debouncedValue = useDebounce(value, 800);

  const { data: results, isFetching } = useSearchMachinesViewsQuery(debouncedValue, { skip: !debouncedValue });

  return {
    results,
    isLoading: isFetching,
    debouncedValue,
  };
};
