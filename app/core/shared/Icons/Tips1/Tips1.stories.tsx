import { Meta, StoryFn as Story } from '@storybook/react';

import { IconTips1 } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Tips1',
  component: IconTips1,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconTips1 {...args} />
);

export const Default = Template.bind({});
