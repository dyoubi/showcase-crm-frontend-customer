import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { Box } from '@/core/shared/Box';
import { ProgressBar } from '@/core/shared/ProgressBar';
import { Text } from '@/core/components/Typography';

import { getRankBasedContent } from '@/features/VipPage/components/VipSlider/constants';

import { ProgressProps } from '../VIPModal.types';
import { LevelLabel, LevelTitle, Row, SingleColRow, StyledCaption, VIPModalContainer } from './VIPModalProgress.styles';

const VIPRank: FC<{ rankLevel: number; rankPoint: number }> = ({ rankLevel, rankPoint }) => {
  const content = getRankBasedContent(rankPoint, rankLevel);

  return (
    <>
      {content.progress !== '' && (
        <>
          <Row>
            <Text level="small">
              <FormattedMessage id="vipModal.yourProgressValue" defaultMessage="Your VIP Progress" />
            </Text>
            <Text level="small">{+content.progress}%</Text>
          </Row>

          <ProgressBar progress={+content.progress} />
        </>
      )}
      <Row />
      {content.progress === '' ? (
        <SingleColRow>
          <LevelLabel>
            {content.toLevelIcon}
            <LevelTitle>{content.toLevelContent}</LevelTitle>
          </LevelLabel>
        </SingleColRow>
      ) : (
        <Row>
          <LevelLabel left>
            {content.fromLevelIcon}
            <LevelTitle>{content.fromLevelContent}</LevelTitle>
          </LevelLabel>
          <LevelLabel>
            {content.toLevelIcon}
            <LevelTitle>{content.toLevelContent}</LevelTitle>
          </LevelLabel>
        </Row>
      )}
    </>
  );
};

export const VIPModalProgress: FC<ProgressProps> = ({ rank }) => {
  return (
    <VIPModalContainer>
      <VIPRank rankLevel={rank.rankLevel} rankPoint={rank.rankPoint} />
      <Box mt="l">
        <StyledCaption as="p">
          <FormattedMessage
            id="vipModal.vipCopy"
            defaultMessage="Your progress is a sum accumulated through your wager on our casino. Increasing through the tiers entitles you to bigger rewards, level up bonus and exclusive VIP treatment."
          />
        </StyledCaption>
      </Box>
    </VIPModalContainer>
  );
};
