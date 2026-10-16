import { useEffect, useMemo, useState } from 'react';

import { MachineView } from '@/core/domains/machineView';

import { SortByOptions } from '@/features/CategoryPage/CategoryPage.types';

export const useMachinesSort = (
  machinesViews: ReadonlyArray<MachineView>,
  sortBy: string | Array<string> | undefined,
) => {
  const [sortedMachines, setSortedMachines] = useState<ReadonlyArray<MachineView>>([]);

  const isEnumValue = (value: string): boolean => {
    return Object.values(SortByOptions).includes(value as SortByOptions);
  };

  const sorted = useMemo(() => {
    if (!machinesViews?.length || Array.isArray(sortBy) || !sortBy || !isEnumValue(sortBy)) {
      return [...machinesViews];
    }

    let sortedArray = [...machinesViews];

    switch (sortBy) {
      case SortByOptions.AZ:
        sortedArray = sortedArray.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case SortByOptions.ZA:
        sortedArray = sortedArray.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case SortByOptions.RECENT:
        sortedArray = sortedArray.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
        break;
      case SortByOptions.OLDEST:
        sortedArray = sortedArray.sort((a, b) => (b.createdAt > a.createdAt ? -1 : 1));
        break;
      default:
        break;
    }

    return sortedArray;
  }, [machinesViews, sortBy]);

  return sorted;
};
