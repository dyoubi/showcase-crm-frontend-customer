import { StoryFn as Story } from '@storybook/react';

import { ButtonSize } from '@/core/shared/Button/Button.types';

import { Select } from './Select';
import { SelectProps, SelectSize } from './Select.types';

const argTypes = {
  size: {
    control: { type: 'radio' },
    options: ButtonSize,
  },
};

export default {
  argTypes,
  title: 'Components / Select',
};

const Template: Story<SelectProps> = ({ ...args }) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  caption: 'Caption text',
  error: 'Error message',
  isDisabled: false,
  label: 'Select label',
  options: [
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
  ],
  size: SelectSize.Big,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  ...Default.args,
  options: [
    {
      icon: 'InfoCircle',
      label: 'Option 1',
      value: 'option-1',
    },
    {
      icon: 'Lock',
      label: 'Option 2',
      value: 'option-2',
    },
    {
      icon: 'Heart',
      label: 'Option 3',
      value: 'option-3',
    },
  ],
};
