import { IntlFormatters } from '@formatjs/intl';

import { SortByOptions } from '@/features/CategoryPage/CategoryPage.types';

export const getSortByOptions = (formatMessage: IntlFormatters['formatMessage']) => [
  {
    value: SortByOptions.AZ,
    label: formatMessage({
      id: 'sortByOption.az',
      defaultMessage: 'A-Z',
    }),
  },
  {
    value: SortByOptions.ZA,
    label: formatMessage({
      id: 'sortByOption.za',
      defaultMessage: 'Z-A',
    }),
  },
  {
    value: SortByOptions.RECENT,
    label: formatMessage({
      id: 'sortByOption.recent',
      defaultMessage: 'Recent',
    }),
  },
  {
    value: SortByOptions.OLDEST,
    label: formatMessage({
      id: 'sortByOption.oldest',
      defaultMessage: 'Oldest',
    }),
  },
];
