import { Meta, StoryFn as Story } from '@storybook/react';

import { IconFilter } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Filter',
  component: IconFilter,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconFilter {...args} />
);

export const Default = Template.bind({});
