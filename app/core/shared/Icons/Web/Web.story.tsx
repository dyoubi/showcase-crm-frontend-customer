import { Meta, StoryFn as Story } from '@storybook/react';

import { IconWeb } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Web',
  component: IconWeb,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // @ts-ignore
  <IconWeb {...args} />
);

export const Default = Template.bind({});
