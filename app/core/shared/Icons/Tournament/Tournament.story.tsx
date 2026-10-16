import { Meta, StoryFn as Story } from '@storybook/react';

import { IconTournament } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Tournament',
  component: IconTournament,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // @ts-ignore
  <IconTournament {...args} />
);

export const Default = Template.bind({});
