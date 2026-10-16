import { StoryFn as Story } from '@storybook/react';

import { IconArrowLeft } from '@/core/shared/Icons/ArrowLeft/ArrowLeft';
import { IconArrowRight } from '@/core/shared/Icons/ArrowRight/ArrowRight';

import { Button } from './Button';
import { ButtonColor, ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const argTypes = {
  size: {
    control: {
      type: 'radio',
    },
    options: ButtonSize,
  },
  disableHoverStyles: {
    active: {
      control: 'boolean',
    },
  },
  isLoading: {
    active: {
      control: 'boolean',
    },
  },
  iconLeft: {
    table: {
      disable: true,
    },
  },
  iconRight: {
    table: {
      disable: true,
    },
  },
  isIconButton: {
    table: {
      disable: true,
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
};

export default {
  argTypes,
  component: Button,
  title: 'Components / Button',
};

const Template: Story<ButtonProps> = ({ ...args }) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Get started',
  disabled: false,
  color: ButtonColor.Primary,
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  color: ButtonColor.Secondary,
};

export const Outlined = Template.bind({});
Outlined.args = {
  ...Primary.args,
  variant: ButtonVariant.Outlined,
};

export const IconLeft = Template.bind({});
IconLeft.args = {
  ...Primary.args,
  iconLeft: <IconArrowRight />,
};

export const IconRight = Template.bind({});
IconRight.args = {
  ...Primary.args,
  iconRight: <IconArrowLeft />,
};
