import { StoryFn as Story } from '@storybook/react';

import { Headline } from '.';

export default {
  component: Headline,
  title: 'Typography / Headline',
};

export const Default: Story = ({ ...args }) => <Headline {...args} />;
Default.args = {
  children: 'Something longer to test the line height and letter tracking guide',
};
