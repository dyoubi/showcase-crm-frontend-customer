import { OptionProps } from '../../shared/Select/Select.types';

export type FilterBarProps = {
  filterOptions: Array<OptionProps>;
  onFilterSelect: () => void;
  onSortSelect: () => void;
  sortOptions: Array<OptionProps>;
};
