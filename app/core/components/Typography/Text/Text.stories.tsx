import { StoryFn as Story } from '@storybook/react';

import { TextProps } from './Text.types';

import { Text } from '.';

const argTypes = {
  level: {
    control: { type: 'radio' },
    // eslint-disable-next-line array-element-newline, array-bracket-newline
    options: ['medium', 'small'],
  },
  type: {
    control: { type: 'radio' },
    // eslint-disable-next-line array-element-newline, array-bracket-newline
    options: ['default', 'link'],
  },
};

export default {
  argTypes,
  component: Text,
  title: 'Typography / Text',
};

export const Default: Story<
  TextProps & {
    children: string;
  }
> = ({ ...args }) => <Text {...args} />;
Default.args = {
  children: 'Something longer to test the line height and letter tracking guide',
  level: 'medium',
  type: 'default',
};
