import { StoryFn as Story } from '@storybook/react';

import { GameDescription } from './GameDescription';
import { GameDescriptionProps } from './GameDescription.types';

export default {
  title: 'Partials / GameDescription',
};

const Template: Story<GameDescriptionProps> = ({ ...args }) => <GameDescription {...args} />;

export const Default = Template.bind({});
Default.args = {
  description: 'You either die a hero, or you live long enough to see yourself become the villain.',
};
