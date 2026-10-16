import { Meta, StoryFn as Story } from '@storybook/react';

import { IconLive2 } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Live2',
  component: IconLive2,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconLive2 {...args} />
);

export const Default = Template.bind({});
