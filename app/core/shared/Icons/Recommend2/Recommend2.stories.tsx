import { Meta, StoryFn as Story } from '@storybook/react';

import { IconRecommend2 } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Recommend2',
  component: IconRecommend2,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconRecommend2 {...args} />
);

export const Default = Template.bind({});
