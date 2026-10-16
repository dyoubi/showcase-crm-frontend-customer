import { Meta, StoryFn as Story } from '@storybook/react';

import { IconShieldCross } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/ShieldCross',
  component: IconShieldCross,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // @ts-ignore
  <IconShieldCross {...args} />
);

export const Default = Template.bind({});
