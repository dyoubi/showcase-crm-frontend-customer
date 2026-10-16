import { Meta, StoryFn as Story } from '@storybook/react/types-6-0';

import { IconShare } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Share',
  component: IconShare,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconShare {...args} />
);

export const Default = Template.bind({});
