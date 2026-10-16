import { StoryFn as Story } from '@storybook/react';

import { Checkbox } from './Checkbox';
import { CheckboxProps, CheckboxVariant } from './Checkbox.types';

const argTypes = {
  variant: {
    control: {
      type: 'radio',
    },
    options: CheckboxVariant,
  },
  isOutlined: {
    control: 'boolean',
  },
};

export default {
  argTypes,
  title: 'Components / Checkbox',
};

const Template: Story<CheckboxProps & { children: string }> = ({ ...args }) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Checkbox label',
  isOutlined: false,
};
