import { Meta, StoryFn as Story } from '@storybook/react';

import { IconZoom } from '@/core/shared/Icons/Zoom/Zoom';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Zoom',
  component: IconZoom,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconZoom {...args} />
);

export const Default = Template.bind({});
