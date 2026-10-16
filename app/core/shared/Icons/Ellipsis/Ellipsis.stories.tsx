import { Meta, StoryFn as Story } from '@storybook/react';

import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';
import { IconEllipsis } from './Ellipsis';

export default {
  title: 'Icons/Ellipsis',
  component: IconEllipsis,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconEllipsis {...args} />
);

export const Default = Template.bind({});
