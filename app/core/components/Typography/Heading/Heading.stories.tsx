import { StoryFn as Story } from '@storybook/react';

import { Heading } from './Heading';
import { HeadingProps } from './Heading.types';

export default {
  argTypes: {
    align: {
      control: { type: 'select' },
      // eslint-disable-next-line array-element-newline, array-bracket-newline
      options: ['left', 'center', 'right'],
    },
    color: {
      control: { type: 'radio' },
      // eslint-disable-next-line array-element-newline, array-bracket-newline
      options: ['undefined', 'blue', 'dark', 'green', 'light', 'orange', 'purple', 'white', 'yellow'],
    },
    element: {
      control: { type: 'select' },
      // eslint-disable-next-line array-element-newline, array-bracket-newline
      options: ['h1', 'h2', 'h3'],
    },
    size: {
      control: { type: 'select' },
      // eslint-disable-next-line array-element-newline, array-bracket-newline
      options: ['h1', 'h2', 'h3'],
    },
  },
  component: Heading,
  title: 'Typography / Heading',
};

const Template: Story<HeadingProps & { children: string }> = ({ ...args }) => <Heading {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  align: 'left',
  children: 'Heading h1',
  size: 'h1',
};
