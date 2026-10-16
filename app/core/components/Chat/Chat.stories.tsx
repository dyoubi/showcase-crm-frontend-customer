import { StoryFn as Story } from '@storybook/react';

import { IconEarlyAdopter, IconSatoshiEnthusiast } from '@/core/shared/Icons';

import { Chat } from './Chat';
import { ChatProps } from './Chat.types';

export default {
  component: Chat,
  title: 'Components / Chat',
};

const chatMessages = [
  {
    id: 1,
    icon: <IconEarlyAdopter />,
    username: 'Username',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
  {
    id: 2,
    icon: <IconSatoshiEnthusiast />,
    username: 'Username',
    body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
  },
  {
    id: 3,
    icon: <IconEarlyAdopter />,
    username: 'Username',
    body: 'Excepteur sint occaecat cupidatat non proident',
  },
  {
    id: 4,
    icon: <IconSatoshiEnthusiast />,
    username: 'Username',
    body: 'Lorem ipsum',
  },
];

const Template: Story<ChatProps> = ({ ...args }) => <Chat {...args} />;

export const Default = Template.bind({});

Default.args = {
  messages: chatMessages,
};
