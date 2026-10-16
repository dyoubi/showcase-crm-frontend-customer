import { styled } from 'styled-components';

import { Button, Flex } from '@/core/shared';
import { Headline, Subheadline } from '@/core/components/Typography';
import { Widget } from '@/core/components/Widget/Widget';

import { mq, screen } from '@/libs/media-query';

export const WidgetContainer = styled(Flex)(({ theme }) => ({
  gap: theme.margin.s,
  marginBottom: theme.margin.l,
  [`${mq.with({ theme }).until(screen.MD)}`]: {
    flexDirection: 'column',
  },
}));

export const WidgetContent = styled.p(({ theme }) => ({
  fontWeight: 300,
  fontSize: theme.typography.body.small.fontSize,
  marginTop: theme.margin.xxxs,
}));

export const LastChanceButton = styled(Button)(({ theme }) => ({
  marginTop: theme.margin.s,
  color: '#FF307B',
}));

export const TournamentInfoContainer = styled(Flex)(({ theme }) => ({
  fontWeight: 700,
  width: '70%',
  justifyContent: 'space-between',
  fontSize: theme.typography.body.small.fontSize,
}));

export const StyledWidget = styled(Widget)({
  flex: 1,
});

export const AvatarImage = styled.img(({ theme }) => ({
  width: 50,
  height: 50,
  alignSelf: 'center',
}));

export const ProfileInfoHeader = styled.p(({ theme }) => ({
  fontWeight: 700,
  fontSize: theme.typography.body.small.fontSize,
  margin: 0,
}));

export const ProfileInfoSubHeader = styled.p(({ theme }) => ({
  fontWeight: 300,
  fontSize: theme.typography.button.medium.fontSize,
  margin: 0,
}));

export const ProfileWidgetContainer = styled(Flex)({
  gap: 10,
  justifyContent: 'center',
  marginBottom: 10,
});

export const ProgressInfo = styled(Flex)({
  justifyContent: 'space-between',
});
