import { StoryFn as Story } from '@storybook/react';

import { IconArrowRight } from '@/core/shared/Icons';

import { IconButton } from './IconButton';
import { IconButtonProps, IconButtonSize } from './IconButton.types';
import { ButtonSize } from '../Button.types';

export default {
  argTypes: {
    icon: {
      table: {
        disable: true,
      },
    },
  },
  component: IconButton,
  title: 'Components / IconButton',
};

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  icon: <IconArrowRight />,
  size: ButtonSize.Big,
};
