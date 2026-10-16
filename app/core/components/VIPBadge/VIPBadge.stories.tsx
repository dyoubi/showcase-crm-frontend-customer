import { StoryFn as Story } from '@storybook/react';

import { VIPBadgeLevel, VIPBadgeProps } from './VIPBadge.types';

import { VIPBadge } from '.';

const argTypes = {
  level: {
    control: {
      labels: {
        undefined: 'None',
      },
      type: 'radio',
    },
    options: VIPBadgeLevel,
  },
};

export default {
  argTypes,
  component: VIPBadge,
  title: 'Components / VIPBadge',
};

export const Default: Story<
  VIPBadgeProps & {
    children: string;
  }
> = ({ ...args }) => <VIPBadge {...args} />;
Default.args = {
  children: 'Username',
  level: VIPBadgeLevel.Default,
};
