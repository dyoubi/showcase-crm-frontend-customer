import styled from 'styled-components';

import { Box } from '@/core/shared/Box';
import { ButtonSize } from '@/core/shared/Button/Button.types';
import { Caption } from '@/core/components/Typography/Caption';
import { Input } from '@/core/shared/Input';
import { Button, Flex } from '@/core/shared';
import { SelectWrapper } from '@/core/shared/Select/Select.styles';
import { Text } from '@/core/components/Typography';

import { mq, screen } from '@/libs/media-query';

export const SelectOption = styled.div({
  display: 'flex',
});

export const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  marginTop: theme.margin.xxs,
  columnGap: theme.margin.xxs,
  alignItems: 'center',
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    flexDirection: 'column',
    rowGap: theme.margin.xxs,
    alignItems: 'start',
    [SelectWrapper]: {
      width: '100%',
    },
  },
}));

export const ActionGroup = styled(Flex)(({ theme }) => ({
  justifyContent: 'flex-start',

  [`${mq.with({ theme }).until(screen.SM)}`]: {
    justifyContent: 'center',
  },
}));

export const StyledButton = styled(Button).attrs({
  size: ButtonSize.Medium,
})(() => ({
  padding: '16px',
}));

export const MessageBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '10px',
  textAlign: 'center',
});

export const InfoCaption = styled(Caption)(({ theme }) => ({
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    justifyContent: 'center',
    marginBottom: theme.margin.s,
  },
}));
export const StyledInput = styled(Input)(({ theme }) => ({
  '& input': {
    height: '58px',
  },

  [`${mq.with({ theme }).until(screen.SM)}`]: {
    width: '100%',
  },
}));

export const SectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 10,
  background: theme.rebrandingColors.backgroundColor,
  padding: theme.padding.l,
}));

export const StyledInfoText = styled(Text)(({ theme }) => ({
  color: theme.rebrandingColors.palette.gray[20],
  marginBottom: theme.margin.m,
}));
