import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'styled-components';
import Link from 'next/link';

import { Flex } from '@/core/shared/Flex';
import { Thumbnail } from '@/core/components/Thumbnail';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { routePaths } from '@/core/constants/routes';

// import { useGetMachinesLeaderbordQuery } from '@/core/domains/leaderboard';

import { TinyArrow } from './TinyArrow';
import {
  FlexContainer,
  ScoreContainer,
  StyledHeading,
  ThumbnailCaption,
  ThumbnailWrapper,
  WidgetBorder,
  WidgetContainer,
} from '../Leaderboard.styles';
import { BoardProps, LeaderboardType } from '../Leaderboard.types';
import data from './data.json';

export const LeaderboardRTP = ({ switchBoard }: BoardProps) => {
  const { margin } = useTheme();
  const { formatNumber, formatMessage } = useIntl();
  const { isPhone, isTabletOrPhone } = useBreakpoints();
  const [order, setOrder] = useState<'descending' | 'ascending'>('descending');
  // const { data: leaderboardMachines } = useGetMachinesLeaderbordQuery(order, { refetchOnMountOrArgChange: true });

  const day = new Date().getDay();
  const leaderboardMachines = data[order][day];
  const leaderboardLabels = [
    formatMessage({
      id: 'leaderboard.buttonPlayer',
      defaultMessage: 'Player',
    }),
    formatMessage({
      id: 'leaderboard.buttonRTP',
      defaultMessage: 'RTP',
    }),
  ];

  const handleTabSelect = (selectedIndex: number) => {
    if (selectedIndex === 0) {
      switchBoard?.(LeaderboardType.Player);
    } else {
      switchBoard?.(LeaderboardType.RTP);
    }
  };

  return (
    <WidgetBorder>
      <WidgetContainer>
        <FlexContainer justify="space-between" mb={margin.m} mr={margin.m}>
          <FlexContainer>
            <StyledHeading size="h4">
              <FormattedMessage id="leaderboard.rtp" defaultMessage="Leaderboard RTP" />
            </StyledHeading>
          </FlexContainer>
          <Flex flexDirection="row">
            <TinyArrow direction="top" isSelected={order === 'ascending'} onClick={() => setOrder('ascending')} />
            <TinyArrow direction="bottom" isSelected={order === 'descending'} onClick={() => setOrder('descending')} />
          </Flex>
        </FlexContainer>
        <FlexContainer gap={isPhone ? 10 : 15} mt={isPhone ? 30 : 50}>
          {leaderboardMachines?.map((item, index) => (
            <ThumbnailWrapper key={`${item?.id}_${item?.position}`}>
              <ScoreContainer>
                <ThumbnailCaption>
                  RTP {formatNumber(item?.member?.rtp || 0, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}%
                </ThumbnailCaption>
              </ScoreContainer>
              <Link key={item.id} href={`${routePaths.game}/${item.id}`}>
                <Thumbnail
                  slug={item.id}
                  src={{
                    mobile: item?.member?.image?.mobile?.url,
                    desktop: item?.member?.image?.desktop?.url,
                  }}
                  title={item?.member?.title}
                  itemId={item?.id}
                />
              </Link>
            </ThumbnailWrapper>
          ))}
        </FlexContainer>
      </WidgetContainer>
    </WidgetBorder>
  );
};
