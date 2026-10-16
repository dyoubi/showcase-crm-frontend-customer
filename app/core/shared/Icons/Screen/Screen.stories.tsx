import { Meta, StoryFn as Story } from '@storybook/react';

import { IconScreen } from '@/core/shared/Icons/Screen/Screen';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Screen',
  component: IconScreen,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconScreen {...args} />
);

export const Default = Template.bind({});
