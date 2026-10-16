import styled from 'styled-components';

import { Caption } from '@/core/components/Typography/Caption';
import { Box } from '@/core/shared/Box';
import { IconPlayingCard1, IconPlayingCard2 } from '@/core/shared/Icons';
import { Heading } from '@/core/components/Typography';

import { mq, screen } from '@/libs/media-query';

export const LeaderboardContainer = styled.div(({ theme }) => ({
  display: 'flex',
  columnGap: 20,
  rowGap: 20,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

export const WidgetBorder = styled.div(({ theme }) => ({
  width: '100%',
  background: `${theme.rebrandingColors.gradients.blue}`,
  borderRadius: '10px',
  padding: '2px',
}));

export const WidgetContainer = styled.div(({ theme }) => ({
  background: `${theme.rebrandingColors.palette.dark[80]}`,
  padding: '10px 10px 10px',
  width: '100%',
  height: '100%',
  borderRadius: '8px',
}));

export const PlayerContainer = styled.div(({ theme }) => ({
  width: '100%',
}));

type FlexContainerProps = {
  justify?: 'flex-start' | 'flex-end' | 'space-around' | 'space-between';
  direction?: 'column' | 'row';
  mb?: number | string;
  mr?: number | string;
  mt?: number | string;
  gap?: number | string;
};

export const FlexContainer = styled.div<FlexContainerProps>(({ justify, direction, mb, mr, mt, gap }) => ({
  display: 'flex',
  flexDirection: direction || 'row',
  alignItems: 'center',
  justifyContent: justify || 'center',
  gap: gap || 0,
  marginBottom: mb || 0,
  marginRight: mr || 0,
  marginTop: mt || 0,
}));

export const ThumbnailWrapper = styled.div(({ theme }) => ({
  flexShrink: 0,
  width: '100px',

  [`${mq.with({ theme }).until(screen.MD)}`]: {
    width: '90px',
  },
}));

export const Row = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, auto)',
  gridGap: 22,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: 288,
    gridGap: 0,
    margin: '0 auto',
  },
}));

export const IconCard1 = styled(IconPlayingCard1)(({ theme }) => ({
  marginRight: theme.margin.s,
}));

export const IconCard2 = styled(IconPlayingCard2)(({ theme }) => ({
  marginRight: theme.margin.s,
}));

export const ThumbnailCaption = styled.span(({ theme }) => ({
  position: 'absolute',
  bottom: '-12px',
  zIndex: 1,
  background: theme.rebrandingColors.colorVariants.danger,
  color: theme.rebrandingColors.palette.light[20],
  fontWeight: 500,
  padding: '0 7px',
  fontSize: 14,
  borderRadius: 3,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    fontSize: 10,
    lineHeight: '18px',
  },
}));

export const ScoreContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
});

export const StyledCaption = styled(Caption)<{ mb?: string }>(({ mb }) => ({
  marginBottom: mb || 0,
}));

export const BadgeContainer = styled.div<{ mb?: number }>(({ theme, mb }) => ({
  width: 240,
  display: 'flex',
  justifyContent: 'center',
  marginBottom: mb || 0,
  [`${mq.with({ theme }).until(screen.LG)}`]: {
    width: 200,
  },
}));

export const StyledHeading = styled(Heading)(({ theme }) => ({
  paddingLeft: theme.padding.s,
  [`${mq.with({ theme }).until(screen.SM)}`]: {
    fontSize: theme.typography.subheadline.fontSize,
  },
}));

// LeaderboardCurrencies styles

export const CurrencyItem = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'center',
  fontSize: 14,
  marginTop: 8,
  borderRadius: 8,
}));

export const LeftContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}));

export const IconWrapper = styled.div(({ theme }) => ({
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.rebrandingColors.palette.light[80],
  borderRadius: 6,
}));

export const NameSymbolWrapper = styled.div(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const CurrencyName = styled.span(() => ({
  fontSize: 22,
  fontWeight: 600,
}));

export const CurrencyValue = styled.span(() => ({
  fontWeight: 600,
  fontSize: 18,
  justifySelf: 'flex-end',
  alignSelf: 'flex-start',
}));

// LeaderboardPlayer styles

export const TableHeader = styled.div(() => ({
  display: 'grid',
  gridTemplateColumns: '50px 2fr 70px',
  marginTop: 8,
  padding: '0px 20px',
  fontSize: 14,
}));

export const PlayerRow = styled.div<{ isTopPlayer: boolean }>(({ isTopPlayer }) => ({
  display: 'grid',
  gridTemplateColumns: '50px 2fr 70px',
  alignItems: 'center',
  marginTop: 8,
  fontSize: 14,
  backgroundColor: '#231B47',
  border: isTopPlayer ? '2px solid #F8D102' : 'none',
  boxShadow: isTopPlayer ? '0px 0px 4px rgba(248, 207, 2, 0.7)' : 'none',
  borderRadius: 8,
  padding: '10px 20px',
}));

export const RankCircle = styled.span<{ rank: number }>(({ rank, theme }) => ({
  width: 30,
  height: 30,
  lineHeight: '29px',
  textAlign: 'center',
  fontWeight: 600,
  borderRadius: '50%',
  background:
    rank < 3
      ? [
          theme.rebrandingColors.gradients.yellow,
          theme.rebrandingColors.gradients.grey,
          theme.rebrandingColors.gradients.orange,
        ][rank]
      : '#4B4B4B',
  color: '#120D2A',
}));

export const UserInfo = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}));

export const Avatar = styled.img(() => ({
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
}));

export const Nickname = styled.span(() => ({
  color: '#FFFFFF',
  fontWeight: 600,
  fontSize: 14,
}));

export const Multiplier = styled.span<{ rank: number }>(({ rank }) => ({
  color: rank < 3 ? ['#F8D102', '#A1ABB2', '#FE5B00'][rank] : '#4B4B4B',
  fontWeight: 600,
  fontSize: 16,
}));
