import { Text } from '../Typography/Text';
import { IconContainer, StyledMessage, Username } from './Chat.styles';
import { MessageProps } from './Chat.types';

export const Message = ({ userName, icon, message }: MessageProps) => (
  <StyledMessage>
    <IconContainer>{icon}</IconContainer>
    <Username level="small">{userName}</Username>
    <Text level="small">{message}</Text>
  </StyledMessage>
);
