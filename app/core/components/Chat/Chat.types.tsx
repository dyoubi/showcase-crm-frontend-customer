import { ReactElement } from 'react';

export type ChatProps = {
  messages: Array<MessageType>;
};

export type MessageType = {
  id: number;
  username: string;
  icon: ReactElement;
  body: string;
};

export type MessageProps = {
  userName: string;
  icon: ReactElement;
  message: string;
};
