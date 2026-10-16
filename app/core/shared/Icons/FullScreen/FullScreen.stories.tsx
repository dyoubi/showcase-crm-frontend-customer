import { Meta, StoryFn as Story } from '@storybook/react';

import { IconFullScreen } from '@/core/shared/Icons/FullScreen/FullScreen';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/FullScreen',
  component: IconFullScreen,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconFullScreen {...args} />
);

export const Default = Template.bind({});
