import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Checkbox } from '@/core/shared/Checkbox';
import { Caption } from '@/core/components/Typography';
import { Box } from '@/core/shared/Box';
import { useGetPlayerQuery, usePatchPlayerMutation } from '@/core/domains/player';

import { useNotification } from '@/utils/notifications/notification-context';

import { CheckboxContainer, SettingsContainer, StyledButton, StyledHeading, StyledText } from './Settings.styles';
import { SectionContainer } from './Account.styles';

export const Preferences = () => {
  const { addNotification } = useNotification();
  const [updateUser] = usePatchPlayerMutation();

  const { data: userData } = useGetPlayerQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [ghostMode, setGhostMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [rainMode, setRainMode] = useState(false);

  const onSubmit = async (section: 'privacy' | 'phone') => {
    try {
      const payload = section === 'privacy' ? { ghost: ghostMode, statistics: showStats } : { rain: rainMode };

      await updateUser({ privacy: payload });
      addNotification({
        text: (
          <FormattedMessage
            id="settings.preferences.successMessage"
            defaultMessage="Your preferences details have been saved."
          />
        ),
        type: 'success',
        title: <FormattedMessage defaultMessage="Success" id="notification.successTitle" />,
      });
    } catch (ex) {
      addNotification({
        text: <FormattedMessage id="settings.preferences.errorMessage" defaultMessage="Something went wrong." />,
        type: 'error',
        title: <FormattedMessage defaultMessage="Error" id="notification.errorTitle" />,
      });
    }
  };

  useEffect(() => {
    setGhostMode(!!userData?.privacy?.ghost);
    setShowStats(!!userData?.privacy?.statistics);
    setRainMode(!!userData?.privacy?.rain);
  }, [userData]);

  return (
    <SettingsContainer>
      <SectionContainer>
        <StyledHeading size="h4">
          <FormattedMessage id="privacy" defaultMessage="Privacy" />
        </StyledHeading>
        <Box mb="xxs">
          <Caption>
            <FormattedMessage
              id="privacy.description"
              defaultMessage="User privacy is one of the core values of BitPlay. These settings allow you to be completely anonymous from the rest of the players."
            />
          </Caption>
        </Box>
        <CheckboxContainer>
          <Box mr="xxs">
            <Checkbox checked={ghostMode} onChange={() => setGhostMode((curr) => !curr)} />
          </Box>
          <Box>
            <StyledText level="medium">
              <FormattedMessage id="preferences.checkboxLabel.ghostMode" defaultMessage="Enable Ghost Mode" />
            </StyledText>
            <StyledText level="small">
              <FormattedMessage
                id="preferences.checkboxDescription.ghostMode"
                defaultMessage="Your bets won't appear in public bet feed and bet preview"
              />
            </StyledText>
          </Box>
        </CheckboxContainer>
        <CheckboxContainer>
          <Box mr="xxs">
            <Checkbox checked={showStats} onChange={() => setShowStats((curr) => !curr)} />
          </Box>
          <Box>
            <StyledText level="medium">
              <FormattedMessage id="preferences.checkboxLabel.statistics" defaultMessage="Hide all your statistics" />
            </StyledText>
            <StyledText level="small">
              <FormattedMessage
                id="preferences.checkboxDescription.statistics"
                defaultMessage="Other users won't be able to view your wins, loses and wagered statistics"
              />
            </StyledText>
          </Box>
        </CheckboxContainer>
        <StyledButton onClick={() => onSubmit('privacy')}>
          <FormattedMessage id="preferences.save" defaultMessage="Save" />
        </StyledButton>
      </SectionContainer>
      <SectionContainer>
        <StyledHeading size="h4">
          <FormattedMessage id="preferences.community" defaultMessage="Community" />
        </StyledHeading>
        <CheckboxContainer>
          <Box mr="xxs">
            <Checkbox checked={rainMode} onChange={() => setRainMode((curr) => !curr)} />
          </Box>
          <Box>
            <StyledText level="medium">
              <FormattedMessage id="preferences.checkboxLabel.rain" defaultMessage="Exclude from rain" />
            </StyledText>
            <StyledText level="small">
              <FormattedMessage
                id="preferences.checkboxDescription.rain"
                defaultMessage="Prevents you from receiving a rain in chat"
              />
            </StyledText>
          </Box>
        </CheckboxContainer>
        <StyledButton onClick={() => onSubmit('phone')}>
          <FormattedMessage id="preferences.save" defaultMessage="Save" />
        </StyledButton>
      </SectionContainer>
    </SettingsContainer>
  );
};
