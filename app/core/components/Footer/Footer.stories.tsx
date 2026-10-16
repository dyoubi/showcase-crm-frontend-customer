import { StoryFn as Story } from '@storybook/react';

import { Footer } from './Footer';

const Template: Story = ({ ...args }) => <Footer />;

export const MainFooter = Template.bind({});

export default {
  component: Footer,
  title: 'Partials / Footer',
};
