import { StoryFn as Story } from '@storybook/react';

import { Logo } from '../Logo/Logo';

import { LogoBox } from '.';

export default {
  component: LogoBox,
  title: 'Components / Logo Box',
};

export const Default: Story<{ children: string }> = ({ ...args }) => (
  <LogoBox>
    <Logo />
  </LogoBox>
);
