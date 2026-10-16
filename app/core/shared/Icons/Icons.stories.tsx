import { FC } from 'react';
import { Meta, StoryFn as Story } from '@storybook/react';

import * as t from './types';

import * as Icons from '.';

export const iconStorySettings = {
  argTypes: {
    color: {
      control: 'color',
    },
    size: {
      control: { type: 'select' },
      options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'],
    },
    opacity: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
  },
  args: {
    color: 'white',
  },
};

const IconsShowCase = (props: t.IconProps) => {
  const keys = Object.keys(Icons);

  return (
    <div>
      {keys.map((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line import/namespace
        const Icon = Icons[key] as FC<IconProps>;

        return <Icon key={key} id={key} {...props} style={{ marginRight: 9 }} />;
      })}
    </div>
  );
};

export default {
  title: 'IconsShowCase',
  component: IconsShowCase,
  ...iconStorySettings,
} as Meta;

const Template: Story<t.IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconsShowCase {...args} />
);

export const Default = Template.bind({});
