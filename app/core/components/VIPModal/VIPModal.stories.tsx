import { StoryFn as Story } from '@storybook/react';

import { VIPModal } from '.';

export default {
  title: 'Partials / VIP Modal',
};

const Template: Story = ({ ...args }) => <VIPModal />;

export const Default = Template.bind({});
