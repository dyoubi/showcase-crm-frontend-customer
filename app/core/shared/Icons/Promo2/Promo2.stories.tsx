import { Meta, StoryFn as Story } from '@storybook/react';

import { IconPromo2 } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Promo2',
  component: IconPromo2,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconPromo2 {...args} />
);

export const Default = Template.bind({});
