import { Meta, StoryFn as Story } from '@storybook/react';

import { IconWallet } from '@/core/shared/Icons';
import { IconProps } from '@/core/shared/Icons/types';

import { iconStorySettings } from '../Icons.stories';

export default {
  title: 'Icons/Wallet',
  component: IconWallet,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconWallet {...args} />
);

export const Default = Template.bind({});
