import { useMemo } from 'react';
import { useTheme } from 'styled-components';

import { useIsLogged } from '@/core/hooks/useIsLogged';
import { Widget } from '@/core/components/Widget/Widget';
import { ButtonColor, ButtonSize, ButtonVariant } from '@/core/shared/Button/Button.types';
import { Button, Flex, ProgressBar } from '@/core/shared';
import { Heading } from '@/core/components/Typography';

import { VIP_LEVEL_MAX_POINTS } from '@/features/VipPage/components/VipSlider/VipSlider.types';

import {
  AvatarImage,
  LastChanceButton,
  ProfileInfoHeader,
  ProfileInfoSubHeader,
  ProfileWidgetContainer,
  ProgressInfo,
  StyledWidget,
  TournamentInfoContainer,
  WidgetContainer,
  WidgetContent,
} from './CategoryPageWidgets.styles';
import Timer from './Timer';

// @DEPRECATED
export const CategoryPageWidgets = () => {
  const { rebrandingColors } = useTheme();
  const countPercent = (num: number, max: number) => {
    return (100 * (num / max)).toFixed(2);
  };

  // CBP-170 until we have the endpoints, we are using constants for the widget contents
  return (
    <WidgetContainer>
      <Widget>
        <ProfileWidgetContainer>
          <AvatarImage src="/Bitplay-favicon.png" />
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              <ProfileInfoHeader>JossoSX84</ProfileInfoHeader>
              <ProfileInfoSubHeader>1 year 11 months</ProfileInfoSubHeader>
            </Flex>
            <Flex flexDirection="column">
              <ProfileInfoHeader>Total Bets</ProfileInfoHeader>
              <ProfileInfoSubHeader>356971</ProfileInfoSubHeader>
            </Flex>
            <Flex flexDirection="column">
              <ProfileInfoHeader>Total Wagered</ProfileInfoHeader>
              <ProfileInfoSubHeader>$174.921,32</ProfileInfoSubHeader>
            </Flex>
          </Flex>
        </ProfileWidgetContainer>
        <ProgressBar progress={+countPercent(70000, VIP_LEVEL_MAX_POINTS.EARLY_ADOPTER)} customColor="#F8D102" />
        <ProgressInfo>
          <ProfileInfoSubHeader>Gold Level</ProfileInfoSubHeader>
          <ProfileInfoSubHeader>Platinum 1</ProfileInfoSubHeader>
        </ProgressInfo>
      </Widget>
      {/* CBP-170 CBP-183 add onclick function for morebutton and button when there is */}
      <Widget header="Last Chance" backgroundColor={rebrandingColors.gradients.red} hasMoreButton>
        <WidgetContent>Sed hac turpis viverra</WidgetContent>
        <Heading size="h3">
          <Timer startHours={2} startMinutes={0} startSeconds={0} />
        </Heading>
        <LastChanceButton customColor={rebrandingColors.palette.light[20]} size={ButtonSize.Small}>
          Play Now
        </LastChanceButton>
      </Widget>
      <Widget
        header="Your Tournament"
        backgroundColor="radial-gradient(124.9% 117.47% at 94.92% 141.54%, #FE176B 32.36%, #150F30 73.6%)"
        hasMoreButton
      >
        <Flex flexDirection="column">
          <WidgetContent>Start today at 10 PM</WidgetContent>
          <TournamentInfoContainer>
            <Flex flexDirection="column">Info</Flex>
            <Flex flexDirection="column">Game</Flex>
          </TournamentInfoContainer>
        </Flex>
      </Widget>
      <Widget header="Bitcoin" hasMoreButton>
        <Flex flexDirection="column">
          <WidgetContent>2.69%</WidgetContent>
          <Heading size="h4">61,560.13€</Heading>
        </Flex>
        <Button color={ButtonColor.Primary} size={ButtonSize.Small}>
          Buy Now
        </Button>
      </Widget>
    </WidgetContainer>
  );
};
