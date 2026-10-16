import { Meta, StoryFn as Story } from '@storybook/react';

import { IconPromo1 } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Promo1',
  component: IconPromo1,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconPromo1 {...args} />
);

export const Default = Template.bind({});
