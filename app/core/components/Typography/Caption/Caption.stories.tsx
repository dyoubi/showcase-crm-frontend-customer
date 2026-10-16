import { StoryFn as Story } from '@storybook/react';

import { Caption } from '.';

export default {
  component: Caption,
  title: 'Typography / Caption',
};

export const Default: Story = ({ ...args }) => <Caption {...args} />;
Default.args = {
  children: 'Something longer to test the line height and letter tracking guide',
};
