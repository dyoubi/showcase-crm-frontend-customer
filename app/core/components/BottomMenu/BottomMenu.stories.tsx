import { StoryFn as Story } from '@storybook/react';

import { BottomMenu } from '.';

export default {
  argTypes: {
    isLogged: {
      active: {
        control: 'boolean',
      },
    },
  },
  component: BottomMenu,
  title: 'Components / BottomMenu',
};

export const Default: Story = ({ ...args }) => <BottomMenu {...args} />;
