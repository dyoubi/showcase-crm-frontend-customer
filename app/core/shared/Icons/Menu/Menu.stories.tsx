import { Meta, StoryFn as Story } from '@storybook/react';

import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';
import { IconMenu } from './Menu';

export default {
  title: 'Icons/Menu',
  component: IconMenu,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconMenu {...args} />
);

export const Default = Template.bind({});
