import { StoryFn as Story } from '@storybook/react';

import { Logo } from './Logo';

export default {
  component: Logo,
  title: 'Components / Logo',
};

const Template: Story = ({ ...args }) => <Logo {...args} />;

export const Primary = Template.bind({});
