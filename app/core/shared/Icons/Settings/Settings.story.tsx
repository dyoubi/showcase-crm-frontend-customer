import { Meta, StoryFn as Story } from '@storybook/react';

import { IconSettings } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Settings',
  component: IconSettings,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // @ts-ignore
  <IconSettings {...args} />
);

export const Default = Template.bind({});
