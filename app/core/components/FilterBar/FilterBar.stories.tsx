import { StoryFn as Story } from '@storybook/react';

import { FilterBar } from './FilterBar';
import { FilterBarProps } from './FilterBar.types';

const options = [
  {
    label: 'Option 1',
    value: 'option-1',
  },

  {
    label: 'Option 2',
    value: 'option-2',
  },

  {
    label: 'Option 3',
    value: 'option-3',
  },
];

export default {
  title: 'Partials / FilterBar',
};

const Template: Story<FilterBarProps> = ({ ...args }) => <FilterBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  filterOptions: options,
  sortOptions: options,
};
