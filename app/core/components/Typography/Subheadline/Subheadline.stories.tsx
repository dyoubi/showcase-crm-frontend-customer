import { StoryFn as Story } from '@storybook/react';

import { Subheadline } from '.';

export default {
  component: Subheadline,
  title: 'Typography / Subheadline',
};

export const Default: Story = ({ ...args }: any) => <Subheadline {...args} />;
Default.args = {
  children: 'Something longer to test the line height and letter tracking guide',
};
