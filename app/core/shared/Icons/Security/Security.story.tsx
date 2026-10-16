import { Meta, StoryFn as Story } from '@storybook/react';

import { IconSecurity } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Security',
  component: IconSecurity,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // @ts-ignore
  <IconSecurity {...args} />
);

export const Default = Template.bind({});
