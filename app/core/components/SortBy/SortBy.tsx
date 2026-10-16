import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { SelectSize } from '@/core/shared/Select/Select.types';
import { IconChevronDown } from '@/core/shared/Icons';

import { StyledSelect, StyledSortByWrapper } from './SortBy.styles';
import { getSortByOptions } from './constants';

export const SortBy = () => {
  interface SortByOption {
    value: string;
    label: string;
  }
  const { formatMessage } = useIntl();
  const sortByOptions = getSortByOptions(formatMessage);
  const router = useRouter();
  const {
    query: { sortBy },
  } = router;

  const [sort, setSort] = useState('az');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setSort(sortBy as string);
    }
  }, [sortBy, isClient]);

  const handleSortChange = (option: SortByOption) => {
    setSort(option.value);
    // Remove devicetype param

    const updatedQuery = { ...router.query };

    delete updatedQuery.deviceType;

    router.replace(
      {
        pathname: router.pathname,
        query: { ...updatedQuery, sortBy: option.value },
      },
      undefined,
      { shallow: true },
    );
  };

  // Don't render until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <StyledSortByWrapper>
        <label htmlFor="sortBy">
          {formatMessage({
            defaultMessage: 'Sort by',
            id: 'sortBy.hint',
          })}
        </label>
        <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
          {formatMessage({
            defaultMessage: 'Loading...',
            id: 'common.loading',
          })}
        </div>
      </StyledSortByWrapper>
    );
  }

  return (
    <StyledSortByWrapper>
      <label htmlFor="sortBy">
        {formatMessage({
          defaultMessage: 'Sort by',
          id: 'sortBy.hint',
        })}
      </label>
      <StyledSelect
        name="sortBy"
        onChange={(thing) => handleSortChange(thing as unknown as SortByOption)}
        size={SelectSize.Small}
        options={sortByOptions}
        defaultValue={sortByOptions[2]}
        value={sortByOptions.find((option) => option.value === sort) || null}
        customIndicator={<IconChevronDown />}
      />
    </StyledSortByWrapper>
  );
};
