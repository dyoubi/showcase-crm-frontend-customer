import React, { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage, useIntl } from 'react-intl';
import { signIn, signOut } from 'next-auth/react';
import { SSRErrorsType } from 'pages/api/types';
import { useIntercom } from 'react-use-intercom';

import { useAppDispatch, useAppSelector } from '@/core/store/store';
import { Box } from '@/core/shared/Box';
import { Checkbox } from '@/core/shared/Checkbox';
import { ButtonSize } from '@/core/shared/Button/Button.types';
import { Input } from '@/core/shared';
import { PasswordInput } from '@/core/shared/Input';
import { getPlayerEventData } from '@/core/domains/player';
import { useMediaContext } from '@/core/hooks/useMediaContext';
import { selectIsUserNotActivatedNotification, toggleUserNotActivatedNotification } from '@/core/store/metaSlice';

import { AuthType } from '@/features/Auth/interfaces';

import { useNotification } from '@/utils/notifications/notification-context';

import { LoginFormProps, LoginFormRequest } from './LoginForm.types';
import { useLoginFormValidation } from './LoginForm.validation';
import { StyledButton, StyledSpan } from './LoginForm.styles';

export const LoginForm: FC<LoginFormProps> = ({ setIsModalOpen, onPasswordForgottenClick }) => {
  const dispatch = useAppDispatch();
  const showNotification = useAppSelector(selectIsUserNotActivatedNotification);
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();
  const { device } = useMediaContext();
  const { trackEvent, update } = useIntercom();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormRequest>({
    mode: 'onChange',
    resolver: yupResolver(useLoginFormValidation()),
  });

  const setUserNotActivatedNotification = useCallback(
    (action: boolean) => {
      dispatch(toggleUserNotActivatedNotification(action));
    },
    [dispatch],
  );

  useEffect(() => {
    if (showNotification) {
      addNotification({
        text: formatMessage({
          id: 'loginForm.userNotActivated',
          defaultMessage: 'Your account is not yet activated. Please check your email or contact support.',
        }),
        type: 'error',
        title: <FormattedMessage defaultMessage="Info" id="notification.infoTitle" />,
        autoRemove: true,
      });

      setUserNotActivatedNotification(false);
    }
  }, [showNotification]);

  const onSubmit = async (formData: LoginFormRequest) => {
    try {
      setIsSubmitting(true);

      const res = await signIn<AuthType.CREDENTIALS>(AuthType.CREDENTIALS, {
        ...formData,
        email: formData.email.toLowerCase(),
        redirect: false,
      });

      if (res?.error) {
        throw res?.error;
      }

      const { eventData, player } = await getPlayerEventData(device);

      trackEvent('user_login', eventData);

      if (player && player.status === 'activated') {
        update({
          userId: player?.userId,
          name: `${player?.firstname} ${player?.lastname}`,
          customAttributes: {
            zipcode: player?.address?.postalCode,
            player_city: player?.address?.city,
            player_country: player?.address?.country,
            birthdate: player?.birthdate,
            username: player?.username,
            vip_rank: player?.stats?.rankLevel,
            marketing_acceptance: player?.marketingAcceptation,
            player_status: player?.status,
          },
        });
      } else {
        signOut({ redirect: false });
        setUserNotActivatedNotification(true);

        throw res?.error;
      }

      setIsModalOpen(false);

      return res;
    } catch (error) {
      let errorMessage;

      if (error === SSRErrorsType.INVALID_CREDENTIALS) {
        errorMessage = formatMessage({
          id: 'loginForm.wrongCredentials',
          defaultMessage: 'Wrong credentials',
        });
      } else {
        errorMessage = formatMessage({
          id: 'loginForm.generalError',
          defaultMessage: 'Something went wrong',
        });
      }

      addNotification({
        text: errorMessage,
        type: 'error',
        title: <FormattedMessage defaultMessage="Error" id="notification.errorTitle" />,
      });

      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Box mb="s">
        <Input
          {...register('email')}
          error={errors.email?.message}
          name="email"
          label={formatMessage({
            defaultMessage: 'Email',
            id: 'email',
          })}
          placeholder={formatMessage({
            defaultMessage: 'Enter your email',
            id: 'loginForm.emailFieldPlaceholder',
          })}
        />
      </Box>
      <Box mb="s">
        <PasswordInput
          {...register('password')}
          name="password"
          label={formatMessage({
            defaultMessage: 'Password',
            id: 'security.password',
          })}
          placeholder={formatMessage({
            defaultMessage: 'Enter your password',
            id: 'loginForm.passwordFieldPlaceholder',
          })}
        />
      </Box>
      <Box mb="s">
        <Checkbox {...register('remember')} error={errors.remember?.message}>
          <FormattedMessage id="loginForm.rememberMe" defaultMessage="Remember me" />
        </Checkbox>
      </Box>
      <Box align="center" mb="s">
        <StyledButton disabled={!isValid} isLoading={isSubmitting} type="submit" size={ButtonSize.Block}>
          <FormattedMessage id="loginForm.submitButton" defaultMessage="Sign in" />
        </StyledButton>
      </Box>
      <Box align="start">
        <StyledSpan
          style={{ cursor: 'pointer' }}
          onClick={onPasswordForgottenClick}
          onKeyUp={onPasswordForgottenClick}
          role="link"
          tabIndex={0}
        >
          <FormattedMessage id="loginForm.forgotYourPassword" defaultMessage="Forgot your password?" />
        </StyledSpan>
      </Box>
    </form>
  );
};
