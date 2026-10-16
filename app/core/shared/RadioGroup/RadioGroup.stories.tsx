import { StoryFn as Story } from '@storybook/react';

import { RadioGroup } from './RadioGroup';
import { RadioGroupProps } from './RadioGroup.types';

export default {
  title: 'Components / RadioGroup',
};

const Template: Story<RadioGroupProps> = ({ ...args }) => <RadioGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  horizontal: false,
  name: 'shipping',
  options: [
    {
      label: 'Option 1',
      value: 'option-1',
    },
    {
      label: 'Option 2',
      value: 'option-2',
    },
  ],
};
