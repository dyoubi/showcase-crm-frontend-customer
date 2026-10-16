import styled from 'styled-components';

import { BasicInput } from '@/core/shared/Input/BasicInput/BasicInput';
import { Button } from '@/core/shared/Button';
import { IconChevronDown } from '@/core/shared/Icons';

import { Text } from '../Typography/Text';

export const ChatContainer = styled.div(({ theme }) => ({
  width: 300,
  padding: 6,
  background: theme.rebrandingColors.palette.dark[20],
}));

export const StyledInput = styled(BasicInput)({
  padding: 10,
  fontSize: 12,
  lineHeight: '12px',
});

export const ButtonsContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '10px 0',
});

export const StyledButton = styled(Button)({
  padding: '10px 18px',
  borderRadius: 6,
  fontSize: 12,
  lineHeight: '16px',
  '&:first-of-type': {
    marginRight: 5,
  },
});

export const ConversationContainer = styled.div({});

export const ChatHeader = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: `${theme.padding.s} ${theme.padding.l}`,
}));

export const DropdownText = styled.div({
  display: 'flex',
  alignItems: 'center',
});

export const StyledChevronDown = styled(IconChevronDown)(({ theme }) => ({
  margin: `0 ${theme.margin.xs}`,
}));

export const StyledMessage = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: 5,
  padding: '4px 5px',
  background: theme.rebrandingColors.colorsToBeDeprecated.dark[60],
}));

export const Username = styled(Text)({
  margin: '0 5px',
  fontWeight: 700,
});

export const IconContainer = styled.span({});
