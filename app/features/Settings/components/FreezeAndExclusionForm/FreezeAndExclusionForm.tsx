/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useIntercom } from 'react-use-intercom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

import { logout } from '@/core/domains/player';
import { Card, Divider, Flex, Select } from '@/core/shared';
import { ButtonColor } from '@/core/shared/Button/Button.types';
import { IconUser } from '@/core/shared/Icons';
import { SelectSize } from '@/core/shared/Select/Select.types';
import { Text } from '@/core/components/Typography';
import { useFreezePlayerAccountMutation, useUpdatePlayerSelfExclusionMutation } from '@/core/domains/settings';
import { useMediaContext } from '@/core/hooks/useMediaContext';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';

import { ActionGroup, MessageBox, StyledButton, StyledInput } from '@/features/Settings/Account.styles';
import {
  FreezeAccountFormData,
  Period,
  PeriodOptions,
  Periods,
  SelfExclusionFormData,
} from '@/features/Settings/Account.types';
import { StyledHeading } from '@/features/Settings/Settings.styles';
import { ConfirmationModal } from '@/features/Settings/components/ConfirmationModal/ConfirmationModal';
import { useSelfExclusionValidation } from '@/features/Settings/Account.validation';
import { ConfirmationButton } from '@/features/Settings/components/ConfirmationModal/ConfirmationModal.styles';
import { periodOptions } from '@/features/Settings/constants';

import { useNotification } from '@/utils/notifications/notification-context';

import { theme } from '@/themes/main';

import { FormBox } from './FreezeAndExclusionForm.styles';

const calculateUntilDate = (period: Period) => {
  const now = new Date();

  let untilDate: Date;

  switch (period) {
    case Periods.DAILY:
      untilDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      break;
    case Periods.WEEKLY:
      untilDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      break;
    case Periods.MONTHLY:
      untilDate = new Date(now);
      untilDate.setMonth(now.getMonth() + 1);
      break;
    case Periods.MONTHLY_THREE:
      untilDate = new Date(now);
      untilDate.setMonth(now.getMonth() + 3);
      break;
    default:
      throw new Error('Invalid period specified');
  }

  return untilDate;
};

export const FreezeAndExclusionForm = () => {
  const [freezeAccountPeriod, setFreezeAccountPeriod] = useState(Periods.DAILY);
  const [isFreezeAccountConfirmationModalOpen, setIsFreezeAccountConfirmationModalOpen] = useState(false);
  const [isFreezing, setIsFreezing] = useState(false);
  const [isFreezingOrExcluding, setIsFreezingOrExcluding] = useState(false);
  const [isSelfExclusionModalOpen, setIsSelfExclusionModalOpen] = useState(false);

  const { show: openLiveSupport, trackEvent } = useIntercom();
  const { formatMessage } = useIntl();
  const router = useRouter();
  const { data: session } = useSession();

  const { device } = useMediaContext();
  const { addNotification } = useNotification();

  const [freezePlayerAccountMutation] = useFreezePlayerAccountMutation();
  const [updatePlayerSelfExclusion] = useUpdatePlayerSelfExclusionMutation();

  const isFreezCompletedRef = useRef(false);
  const isFreezOrExcludeCompletedRef = useRef(false);

  useEffect(() => {
    if (!isFreezing) return;

    const handleRouteChange = (url: string) => {
      if (url === '/' && !isFreezCompletedRef.current) {
        isFreezCompletedRef.current = true;
        logout(trackEvent, device);
      }
    };

    handleRouteChange(router.pathname);
    router.events.on('routeChangeComplete', handleRouteChange);

    if (router.pathname === '/' && !isFreezing) {
      router.events.off('routeChangeComplete', handleRouteChange);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, isFreezing]);

  useEffect(() => {
    if (/^\/settings(?:\/.*)?$/.test(router.pathname)) {
      setIsFreezing(false);
      isFreezCompletedRef.current = false;
    }
  }, [isFreezing]);

  useEffect(() => {
    if (!isFreezingOrExcluding) return;

    const handleRouteChange = (url: string) => {
      if (url === '/' && !isFreezOrExcludeCompletedRef.current) {
        isFreezOrExcludeCompletedRef.current = true;
        logout(trackEvent, device);
      }
    };

    handleRouteChange(router.pathname);

    if (router.pathname === '/' && !isFreezingOrExcluding) {
      router.events.off('routeChangeComplete', handleRouteChange);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, isFreezingOrExcluding]);

  useEffect(() => {
    if (/^\/settings(?:\/.*)?$/.test(router.pathname)) {
      setIsFreezingOrExcluding(false);
      isFreezOrExcludeCompletedRef.current = false;
    }
  }, [isFreezingOrExcluding]);

  const freezeAccountForm = useForm<FreezeAccountFormData>({
    mode: 'onSubmit',
  });
  const selfExclusionForm = useForm<SelfExclusionFormData>({
    mode: 'onSubmit',
    resolver: yupResolver(useSelfExclusionValidation()),
  });

  const {
    register: selfExclusionRegister,
    handleSubmit: handleSelfExclusionSubmit,
    formState: { errors: selfExclusionErrors },
  } = selfExclusionForm;

  const openFreezeAccountConfirmationModal = (formData: any) => {
    setIsFreezeAccountConfirmationModalOpen(true);
  };

  const logOutOnRestriction = () => {
    router.push('/');
    logout(trackEvent, device);
    const errorMessage = formatMessage({
      id: 'privacy.successExclusion',
      defaultMessage: 'Your session has ended. Your account is now restricted.',
    });

    addNotification({
      type: 'success',
      title: <FormattedMessage defaultMessage="Success" id="notification.successTitle" />,
      text: 'Your session has ended. Your account is now restricted.',
    });
  };

  const onSelfExclusionSubmit = () => {
    updatePlayerSelfExclusion(session?.accessToken)
      .then(() => {
        trackEvent('self_exclusion', {
          user_id: session?.player?.userId,
          timestamp: new Date().toISOString(),
          device,
        });
        logOutOnRestriction();
        setIsFreezingOrExcluding(true);
        setIsSelfExclusionModalOpen(false);

        return true;
      })
      .catch((error) => {
        setIsSelfExclusionModalOpen(false);
      });
    setIsSelfExclusionModalOpen(false);
  };

  const onFreezeAccountSubmit = () => {
    setIsFreezeAccountConfirmationModalOpen(false);
    const convertedDateUntil: Date = calculateUntilDate(freezeAccountPeriod);
    const freezeAccountInfo = {
      until: convertedDateUntil,
      accessToken: session?.accessToken,
    };

    freezePlayerAccountMutation(freezeAccountInfo)
      .then(() => {
        logOutOnRestriction();
        setIsFreezing(true);

        return true;
      })
      .catch((error) => {
        setIsFreezing(false);
      });

    return true;
  };

  return (
    <>
      <Card backgroundColor={theme.rebrandingColors.backgroundColor} padding="l">
        <StyledHeading size="h4">
          <FormattedMessage id="freezeAccount" defaultMessage="Freeze Account" />
        </StyledHeading>

        <Text level="medium" marginBottom="m" type="subtle">
          <FormattedMessage
            id="account.freezeAccountAlert"
            defaultMessage="You will not be able to log in to your account for a certain period of time."
          />
        </Text>

        <form onSubmit={freezeAccountForm.handleSubmit(openFreezeAccountConfirmationModal)}>
          <Flex flexDirection="column" gap={28}>
            <Flex flexDirection="row">
              <Select
                defaultValue={periodOptions.find((item) => item.value === Periods.DAILY)}
                label={formatMessage({
                  defaultMessage: 'I understand and want to freeze my account for:',
                  id: 'account.freezeAccountInfo',
                })}
                placeholder={formatMessage({
                  defaultMessage: '24 hours',
                  id: 'account.limitDuration.oneDay',
                })}
                options={periodOptions}
                onChange={(option) => setFreezeAccountPeriod((option as PeriodOptions).value)}
                size={SelectSize.Big}
              />
            </Flex>

            <ActionGroup>
              <StyledButton data-mocked type="submit">
                <FormattedMessage id="freezeAccount" defaultMessage="Freeze Account" />
              </StyledButton>
            </ActionGroup>
          </Flex>
        </form>
      </Card>

      <Card backgroundColor={theme.rebrandingColors.backgroundColor} padding="l">
        <StyledHeading size="h4">
          <FormattedMessage id="account.exclusion" defaultMessage="Self Exclusion" />
        </StyledHeading>

        <Text level="medium" type="subtle" marginBottom="m">
          <FormattedMessage
            id="privacy.exclusion.caption"
            defaultMessage="Need a break from BitPlay? To start the automated self exclusion process, please click the button below to receive confirmation instructions via email."
          />
        </Text>

        <ActionGroup gap={24}>
          <StyledButton data-mocked onClick={openLiveSupport}>
            <FormattedMessage id="global.learnMore" defaultMessage="Learn More" />
          </StyledButton>

          <StyledButton
            color={ButtonColor.Secondary}
            data-mocked
            onClick={() => {
              setIsSelfExclusionModalOpen(true);
            }}
          >
            <FormattedMessage id="account.request" defaultMessage="Request Self Exclusion" />
          </StyledButton>
        </ActionGroup>
      </Card>

      <ConfirmationModal
        header={formatMessage({
          defaultMessage: 'Freeze Account',
          id: 'freezeAccount',
        })}
        hasCloseButton
        isOpen={isFreezeAccountConfirmationModalOpen}
        onClick={onFreezeAccountSubmit}
        setIsOpen={setIsFreezeAccountConfirmationModalOpen}
      >
        <Flex flexDirection="column" gap={16}>
          <Text level="medium">
            <FormattedMessage
              id="freezeAccount.message.info"
              defaultMessage="Your account will be frozen immediately after validation."
            />{' '}
            <strong>
              <FormattedMessage
                id="freezeAccount.message.alert"
                defaultMessage="You WILL NOT BE ABLE TO LOGIN until your account has been unblocked."
              />
            </strong>
          </Text>

          <Text level="medium">
            <FormattedMessage id="freezeAccount.message.rewrite" defaultMessage="This action is irreversible." />
          </Text>
        </Flex>
      </ConfirmationModal>

      <ConfirmationModal
        hasCloseButton
        hasSaveButton={false}
        header={formatMessage({
          defaultMessage: 'Self Exclusion',
          id: 'account.exclusion',
        })}
        isOpen={isSelfExclusionModalOpen}
        setIsOpen={setIsSelfExclusionModalOpen}
      >
        <MessageBox>
          <Text level="medium">
            <FormattedMessage
              id="account.selfExclusion.info"
              defaultMessage="Your account will be closed immediately after validation."
            />{' '}
            <strong>
              <FormattedMessage
                id="account.selfExclusion.alert"
                defaultMessage="You will no longer be able to access this account or request its reopening."
              />
            </strong>
          </Text>

          <Text level="medium" marginBottom="m">
            <FormattedMessage
              id="account.selfExclusion.rewrite"
              defaultMessage="To confirm this request, please enter your 'Username' in the field below and click on 'I understand'."
            />
          </Text>

          <form onSubmit={handleSelfExclusionSubmit(onSelfExclusionSubmit)}>
            <FormBox>
              <StyledInput
                {...selfExclusionRegister('username')}
                error={selfExclusionErrors.username?.message}
                iconLeft={<IconUser />}
                name="username"
                placeholder={formatMessage({
                  defaultMessage: 'Username',
                  id: 'global.username',
                })}
              />
            </FormBox>

            <Text level="medium">
              <strong>
                <FormattedMessage
                  id="account.selfExclusion.irreversible"
                  defaultMessage="This action is irreversible."
                />
              </strong>
            </Text>

            <Divider mb="m" mt="m" />

            <Flex justifyContent="center">
              <ConfirmationButton color={ButtonColor.Secondary} type="submit">
                <FormattedMessage id="confirmationModal.confirm" defaultMessage="I understand" />
              </ConfirmationButton>
            </Flex>
          </form>
        </MessageBox>
      </ConfirmationModal>
    </>
  );
};
