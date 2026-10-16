import { Meta, StoryFn as Story } from '@storybook/react';

import { IconOptions } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Options',
  component: IconOptions,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconOptions {...args} />
);

export const Default = Template.bind({});
