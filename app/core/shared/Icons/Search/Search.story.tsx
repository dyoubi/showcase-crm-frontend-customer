import { Meta, StoryFn as Story } from '@storybook/react';

import { IconSearch } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Search',
  component: IconSearch,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // @ts-ignore
  <IconSearch {...args} />
);

export const Default = Template.bind({});
