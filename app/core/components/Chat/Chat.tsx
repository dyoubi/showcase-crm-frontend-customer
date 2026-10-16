import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { IconButton } from '@/core/shared/Button';
import { ButtonColor } from '@/core/shared/Button/Button.types';
import { Divider } from '@/core/shared/Divider';
import { FieldVariant } from '@/core/shared/FeedbackMessage';
import { IconChat, IconClose, IconEarlyAdopter, IconEnglish, IconFrench } from '@/core/shared/Icons';

import { Dropdown, DropdownItem, DropdownMenu } from '../Dropdown';
import { Message } from './Message';
import { ChatProps, MessageType } from './Chat.types';
import {
  ButtonsContainer,
  ChatContainer,
  ChatHeader,
  ConversationContainer,
  DropdownText,
  StyledButton,
  StyledChevronDown,
  StyledInput,
} from './Chat.styles';

export const Chat = ({ messages }: ChatProps) => {
  const { formatMessage } = useIntl();

  const [isOpen, setIsOpen] = useState(true);

  const onSend = () => undefined;
  const onRulesClick = () => undefined;

  const dropdownContent = (
    <DropdownMenu width={200}>
      <DropdownItem iconLeft={<IconEnglish size="xl" />}>
        <DropdownText>
          <FormattedMessage id="chat.english" defaultMessage="English" />
        </DropdownText>
      </DropdownItem>
      <DropdownItem iconLeft={<IconFrench size="xl" />}>
        <DropdownText>
          <FormattedMessage id="chat.french" defaultMessage="French" />
        </DropdownText>
      </DropdownItem>
    </DropdownMenu>
  );

  return isOpen ? (
    <ChatContainer>
      <ChatHeader>
        <Dropdown content={dropdownContent}>
          <IconEnglish size="xl" />
          <StyledChevronDown />
        </Dropdown>
        <IconClose onClick={() => setIsOpen(false)} />
      </ChatHeader>
      <Divider width={200} center mb="xxs" />
      <ConversationContainer>
        {messages?.map((message: MessageType) => (
          <Message key={message.id} icon={<IconEarlyAdopter />} userName={message.username} message={message.body} />
        ))}
      </ConversationContainer>
      {messages && <Divider width={200} center mb="xxs" mt="xxs" />}
      <StyledInput
        selectable
        variant={FieldVariant.Default}
        placeholder={formatMessage({
          id: 'chat.placeholder',
          defaultMessage: 'Type your message',
        })}
      />
      <ButtonsContainer>
        <StyledButton color={ButtonColor.Secondary} onClick={onRulesClick}>
          <FormattedMessage id="chat.rules" defaultMessage="Rules" />
        </StyledButton>
        <StyledButton onClick={onSend}>
          <FormattedMessage id="chat.send" defaultMessage="Send" />
        </StyledButton>
      </ButtonsContainer>
    </ChatContainer>
  ) : (
    <IconButton isIconButton icon={<IconChat />} onClick={() => setIsOpen(true)} />
  );
};
