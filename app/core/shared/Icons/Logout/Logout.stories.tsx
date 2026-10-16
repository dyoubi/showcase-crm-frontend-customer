import { Meta, StoryFn as Story } from '@storybook/react';

import { IconLogout } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Logout',
  component: IconLogout,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconLogout {...args} />
);

export const Default = Template.bind({});
