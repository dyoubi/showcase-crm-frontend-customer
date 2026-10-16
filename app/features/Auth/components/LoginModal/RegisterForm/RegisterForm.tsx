import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { useIntercom } from 'react-use-intercom';

import { Box } from '@/core/shared/Box';
import { Checkbox } from '@/core/shared/Checkbox';
import { Text } from '@/core/components/Typography/Text';
import { useRegisterPlayerMutation } from '@/core/domains/player';
import { routePaths } from '@/core/constants/routes';
import { DATA_TEST_IDS } from '@/core/constants/constants';
import { ButtonSize } from '@/core/shared/Button/Button.types';
import { DateInputRHF } from '@/core/components/RHF/DateInputRHF';
import { PasswordInput } from '@/core/shared/Input';
import { useMediaContext } from '@/core/hooks/useMediaContext';
import { Flex, Input } from '@/core/shared';

import { useNotification } from '@/utils/notifications/notification-context';

import { RegisterFormProps, RegisterFormRequest, RegisterFormType } from './RegisterForm.types';
import { useRegisterFormValidation } from './RegisterForm.validation';
import { StyledButton, StyledLink } from './RegisterForm.styles';
import { ValidationModal } from '../../ValidationModal';
import { UserRegisterEvent } from '../../ValidationModal/ValidationModal.types';

import { getControlledInputProps } from '@/libs/react-hook-form/utils';

export const RegisterForm: FC<RegisterFormProps> = ({ setIsModalOpen }) => {
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [userRegisterEvent, setUserRegisterEvent] = useState<UserRegisterEvent | null>(null);
  const [affiliateId, setAffiliateId] = useState<string | undefined>();
  const [affiliateToken, setAffiliateToken] = useState<string | undefined>();

  const { formatMessage } = useIntl();
  const { boot } = useIntercom();
  const { device } = useMediaContext();
  const { addNotification } = useNotification();
  const [registerUser, { isSuccess, isError, data: registrationResponse }] = useRegisterPlayerMutation();
  const router = useRouter();

  const { locale: currentLocale } = router;

  const form = useForm<RegisterFormType>({
    mode: 'onChange',
    resolver: yupResolver(useRegisterFormValidation()),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = form;

  useEffect(() => {
    if (router.isReady) {
      const { affid, cxd } = router.query;

      setAffiliateId(affid ? String(affid) : undefined);
      setAffiliateToken(cxd ? String(cxd) : undefined);
    }
  }, [router.isReady, router.query]);

  const onSubmit = async (formData: RegisterFormType) => {
    const { username, email, password, birthDate, marketingAcceptation = false } = formData;

    if (!username || !email || !birthDate || !password) {
      return;
    }

    const dateBirthDate = new Date(birthDate);

    dateBirthDate.setHours(10);

    const requestData: RegisterFormRequest = {
      birth: dateBirthDate.toISOString(),
      email: email.toLowerCase(),
      locale: currentLocale || 'en',
      marketingAcceptation,
      metadata: {
        affiliateId: affiliateId ? `${affiliateId}` : undefined,
        affiliateToken: affiliateToken ? `${affiliateToken}` : undefined,
      },
      password,
      username,
    };

    await registerUser(requestData);
  };

  useEffect(() => {
    if (isSuccess) {
      const eventData: UserRegisterEvent = {
        user_id: registrationResponse.userId,
        username: registrationResponse.nickname,
        registration_timestamp: new Date().toISOString(),
        device,
        marketing_opt_in: form.getValues('marketingAcceptation') ? 'yes' : 'no',
      };

      if (affiliateToken || affiliateId) {
        eventData.affiliate_id = affiliateToken || affiliateId;
      }

      boot({
        userId: eventData.user_id,
        email: registrationResponse.email,
        unsubscribedFromEmails: !registrationResponse.marketingAcceptation,
        createdAt: eventData.registration_timestamp,
        customAttributes: {
          birthdate: registrationResponse.birthdate,
          username: registrationResponse.nickname,
          marketing_acceptance: registrationResponse.marketingAcceptation,
          opt_in: eventData.marketing_opt_in,
          affiliate_id: eventData.affiliate_id || null,
        },
      });

      setUserRegisterEvent(eventData);

      setIsValidationModalOpen(true);
    }

    if (isError) {
      setIsModalOpen(false);
      addNotification({
        text: formatMessage({
          id: 'loginForm.generalError',
          defaultMessage: 'Something went wrong',
        }),
        type: 'error',
        title: <FormattedMessage defaultMessage="Error" id="notification.errorTitle" />,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  const handleValidationSubmit = () => {
    setIsValidationModalOpen(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Flex flexDirection="column" gap={16}>
          <Input
            {...register('username')}
            error={errors.username?.message}
            name="username"
            placeholder={formatMessage({
              defaultMessage: 'Enter your username',
              id: 'registerForm.usernameFieldPlaceholder',
            })}
            label={formatMessage({
              defaultMessage: 'Username',
              id: 'global.username',
            })}
          />

          <Input
            {...register('email')}
            error={errors.email?.message}
            name="email"
            placeholder={formatMessage({
              defaultMessage: 'Enter your email',
              id: 'registerForm.emailFieldPlaceholder',
            })}
            label={formatMessage({
              defaultMessage: 'Email',
              id: 'email',
            })}
          />

          <PasswordInput
            {...register('password')}
            error={errors.password?.message}
            name="password"
            placeholder={formatMessage({
              defaultMessage: 'Enter your password',
              id: 'registerForm.passwordFieldPlaceholder',
            })}
            label={formatMessage({
              defaultMessage: 'Password',
              id: 'security.password',
            })}
          />

          <DateInputRHF
            {...getControlledInputProps(form, 'birthDate')}
            data-testid={DATA_TEST_IDS.REGISTER_BIRTH_DATE_INPUT}
            label={
              <Text level="medium" style={{ marginBottom: '8px' }}>
                <FormattedMessage id="registerForm.dobText" defaultMessage="Date of Birth" />
              </Text>
            }
          />

          <Checkbox {...register('terms')} error={errors.terms?.message}>
            <span>
              <FormattedMessage
                id="registerForm.termsFieldLabel"
                values={{
                  termsAndConditions: (
                    <StyledLink
                      target="_blank"
                      href={currentLocale === 'en' ? routePaths.termsOfService.en : routePaths.termsOfService.fr}
                    >
                      <FormattedMessage id="registerForm.termsAndConditions" defaultMessage="Terms and Conditions" />
                    </StyledLink>
                  ),
                  privacyPolicy: (
                    <StyledLink target="_blank" href={routePaths.privacyPolicy}>
                      <FormattedMessage id="registerForm.privacyPolicy" defaultMessage="Privacy Policy" />
                    </StyledLink>
                  ),
                }}
                defaultMessage="I have read, understood and accept the {termsAndConditions} & {privacyPolicy}"
              />
            </span>
          </Checkbox>

          <Checkbox {...register('policy')} error={errors.policy?.message}>
            <span>
              <FormattedMessage
                id="registerForm.bonusFieldLabel"
                values={{
                  bonusConditions: (
                    <StyledLink
                      target="_blank"
                      href={currentLocale === 'en' ? routePaths.termsOfService.en : routePaths.termsOfService.fr}
                    >
                      <FormattedMessage id="registerForm.bonusConditions" defaultMessage="Bonus Conditions" />
                    </StyledLink>
                  ),
                }}
                defaultMessage="I have read, understood and accept the {bonusConditions}"
              />
            </span>
          </Checkbox>

          <Checkbox {...register('marketingAcceptation')} error={errors.marketingAcceptation?.message}>
            <span>
              <FormattedMessage
                id="registerForm.marketingAcceptation"
                defaultMessage="I agree to receive marketing communications, including promotions and special offers."
              />
            </span>
          </Checkbox>

          <Box mb="s">
            <StyledButton
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
              type="submit"
              size={ButtonSize.Block}
            >
              <FormattedMessage id="registerForm.submitButtonLabel" defaultMessage="Register" />
            </StyledButton>
          </Box>
        </Flex>
      </form>

      <ValidationModal
        isOpen={isValidationModalOpen}
        setIsOpen={setIsValidationModalOpen}
        onSubmit={handleValidationSubmit}
        eventData={userRegisterEvent as UserRegisterEvent}
      />
    </>
  );
};
