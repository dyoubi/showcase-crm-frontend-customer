import { StoryFn as Story } from '@storybook/react';

import { IconAddPlus, IconBag } from '@/core/shared/Icons';

import { MenuProps, MenuVariant } from './Menu.types';

import { Menu, MenuItem } from '.';

export default {
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
  component: Menu,
  title: 'Components / Menu',
};

const menuChildren = [
  <MenuItem key="1">Menu 1</MenuItem>,
  <MenuItem key="2">
    <a href="/">Menu 2</a>
  </MenuItem>,
  <MenuItem isActive key="3">
    <IconAddPlus />
    Menu 3 active
  </MenuItem>,
  <MenuItem key="4">
    <a href="/">
      <IconBag />
      Menu with icon
    </a>
  </MenuItem>,
];

export const Tooltip: Story<MenuProps> = ({ ...args }) => (
  <Menu {...args} variant={MenuVariant.Tooltip}>
    {menuChildren}
  </Menu>
);

export const Lateral: Story<MenuProps> = ({ ...args }) => (
  <Menu {...args} variant={MenuVariant.Lateral}>
    {menuChildren}
  </Menu>
);
