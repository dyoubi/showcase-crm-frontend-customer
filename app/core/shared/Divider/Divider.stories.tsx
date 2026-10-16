import { StoryFn as Story } from '@storybook/react';

import { Divider } from './Divider';
import { DividerProps } from './Divider.types';

export default {
  component: Divider,
  title: 'Components / Divider',
};

export const Default: Story<DividerProps> = ({ ...args }) => <Divider {...args} />;
