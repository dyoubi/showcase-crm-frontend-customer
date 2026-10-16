import { StoryFn as Story } from '@storybook/react';

import { GameFooter } from './GameFooter';
import { GameFooterProps } from './GameFooter.types';

export default {
  title: 'Partials / GameFooter',
};

const Template: Story<GameFooterProps> = ({ ...args }) => <GameFooter {...args} />;

export const Default = Template.bind({});
