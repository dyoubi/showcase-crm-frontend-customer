import { StoryFn as Story } from '@storybook/react';

import { TopMenuProps } from './TopMenu.types';

import { TopMenu } from '.';

export default {
  argTypes: {
    isLogged: {
      active: {
        control: 'boolean',
      },
    },
  },
  component: TopMenu,
  title: 'Partials / TopMenu',
};

export const Default: Story<TopMenuProps> = ({ ...args }) => <TopMenu {...args} />;
