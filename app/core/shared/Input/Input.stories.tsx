import { StoryFn as Story } from '@storybook/react';

import { Button } from '@/core/shared/Button';
import { IconHeart } from '@/core/shared/Icons';

import { BasicInputProps, IconInputProps, InputProps } from './Input.types';

import { BasicInput, IconInput, Input, PasswordInput } from '.';

const argTypes = {
  button: {
    table: {
      disable: true,
    },
  },
  iconLeft: {
    table: {
      disable: true,
    },
  },
  iconRight: {
    table: {
      disable: true,
    },
  },
};

export default {
  argTypes,
  decorators: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Component: any) => (
      <div style={{ margin: '1em' }}>
        <Component />
      </div>
    ),
  ],
  title: 'Components / Input',
};

const Template: Story<InputProps> = ({ ...args }) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  caption: 'Caption',
  disabled: false,
  error: '',
  iconLeft: undefined,
  isValid: false,
  label: 'Label',
  placeholder: 'Placeholder',
  selectable: true,
};

export const Basic: Story<BasicInputProps> = ({ ...args }) => <BasicInput {...args} />;
Basic.args = {
  disabled: false,
  placeholder: 'Placeholder',
};

export const IconLeft: Story<IconInputProps> = ({ ...args }) => <IconInput {...args} />;
IconLeft.args = {
  disabled: false,
  iconLeft: <IconHeart />,
  placeholder: 'Placeholder',
  variant: undefined,
};

export const IconRight: Story<IconInputProps> = ({ ...args }) => <IconInput {...args} />;
IconRight.args = {
  disabled: false,
  iconRight: <IconHeart />,
  placeholder: 'Placeholder',
  variant: undefined,
};

export const WithButton: Story<IconInputProps> = ({ ...args }) => <IconInput {...args} />;
WithButton.argTypes = {
  ...argTypes,
  iconRight: {
    table: {
      disable: true,
    },
  },
};
WithButton.args = {
  button: <Button>Button</Button>,
  disabled: false,
  iconLeft: <IconHeart />,
  placeholder: 'Placeholder',
};

export const Password: Story<InputProps> = ({ ...args }) => <PasswordInput {...args} />;
Password.args = {
  caption: 'Password must be longer than 8 characters',
  disabled: false,
  error: '',
  label: 'Password',
  progress: 50,
};
