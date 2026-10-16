import { Meta, StoryFn as Story } from '@storybook/react';

import { IconSettings2 } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Settings2',
  component: IconSettings2,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // @ts-ignore
  <IconSettings2 {...args} />
);

export const Default = Template.bind({});
