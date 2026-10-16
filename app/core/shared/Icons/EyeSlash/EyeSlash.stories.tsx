import { Meta, StoryFn as Story } from '@storybook/react';

import { IconEyeSlash } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/EyeSlash',
  component: IconEyeSlash,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconEyeSlash {...args} />
);

export const Default = Template.bind({});
