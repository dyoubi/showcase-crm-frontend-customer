import { Meta, StoryFn as Story } from '@storybook/react';

import { IconHome } from '@/core/shared/Icons/Home/Home';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Home',
  component: IconHome,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconHome {...args} />
);

export const Default = Template.bind({});
