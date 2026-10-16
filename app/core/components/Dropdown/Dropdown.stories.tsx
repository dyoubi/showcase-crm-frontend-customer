import { StoryFn as Story } from '@storybook/react';

import { IconAddPlus, IconBag, IconWallet } from '@/core/shared/Icons';

import { DropdownProps } from './Dropdown.types';

import { Dropdown, DropdownContainer, DropdownItem, DropdownMenu } from '.';

export default {
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  component: Dropdown,
  title: 'Components / Dropdown',
};

export const Default: Story<DropdownProps> = ({ ...args }) => (
  <div
    style={{
      width: '100%',
      height: 850,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Dropdown
      {...args}
      content={
        <DropdownMenu width={200}>
          <DropdownItem iconLeft={<IconWallet />}>Menu 1</DropdownItem>
          <DropdownItem iconLeft={<IconBag />}>Menu 2</DropdownItem>
          <DropdownItem iconLeft={<IconAddPlus />}>Menu 3 active</DropdownItem>
          <DropdownItem>Menu 4</DropdownItem>
        </DropdownMenu>
      }
    >
      <DropdownContainer iconLeft={<IconWallet />}>My dropdown wallet</DropdownContainer>
    </Dropdown>
  </div>
);
