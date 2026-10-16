import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { useNotification } from '@/core/hooks/useNotification';
import { useBreakpoints } from '@/core/hooks/useBreakpoints';
import { verifyEmail } from '@/core/domains/validate';
import { AnimatedLoader } from '@/core/shared/AnimatedLoader/AnimatedLoader';
import { AuthenticationTicketTypes, EAuthenticationTicketTypes } from '@/core/domains/auth';
import { Card, Flex } from '@/core/shared';
import { NestedLayout } from '@/core/components/Layout/NestedLayout';
import { Layout } from '@/core/components/Layout';
import { ResetPasswordForm } from '@/core/components/ResetPasswordForm';

import { wrapperServerSideProps } from '@/libs/next';

type VerificationPageSSRProps = {
  action: AuthenticationTicketTypes;
  isValid: boolean;
  token?: string;
};

export const Verification = (props: VerificationPageSSRProps) => {
  const { action, isValid, token } = props;

  const { isTabletOrPhone } = useBreakpoints();
  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();

  const router = useRouter();

  useEffect(() => {
    if (!action) {
      router.push('/');

      return;
    }

    if (action === EAuthenticationTicketTypes.EMAIL) {
      if (isValid) {
        addNotification({
          text: formatMessage({
            id: 'emailActivation.successLead',
            defaultMessage: 'Your account has been successfully activated.',
          }),
          title: formatMessage({
            id: 'notification.success',
            defaultMessage: 'Success',
          }),
          type: 'success',
          autoRemove: true,
          autoRemoveDelay: 5000,
        });
      } else {
        addNotification({
          text: formatMessage({
            id: 'emailActivation.errorLead',
            defaultMessage: 'There was an error activating your account. Please contact support.',
          }),
          title: formatMessage({
            id: 'notification.errorTitle',
            defaultMessage: 'Error',
          }),
          type: 'error',
          autoRemove: true,
          autoRemoveDelay: 5000,
        });
      }

      router.push('/');

      return;
    }

    if (action === EAuthenticationTicketTypes.PASSWORD) {
      if (!isValid) {
        addNotification({
          text: formatMessage({
            id: 'forgetPassword.warningLead',
            defaultMessage: 'Please check the link and try again.',
          }),
          title: formatMessage({
            id: 'notification.warningTitle',
            defaultMessage: 'Warning',
          }),
          type: 'warning',
          autoRemove: true,
          autoRemoveDelay: 5000,
        });

        router.push('/');
      }

      return;
    }

    // Unrecognized action
    router.push('/');
  }, [action, isValid]);

  const onSubmit = () => {
    addNotification({
      autoRemove: true,
      autoRemoveDelay: 5000,
      text: formatMessage({
        id: 'resetPasswordForm.passwordUpdated',
        defaultMessage: 'Your password was updated',
      }),
      title: formatMessage({ id: 'notification.successTitle', defaultMessage: 'Success' }),
      type: 'success',
    });
    router.push('/');
  };

  const render = () => {
    if (action === EAuthenticationTicketTypes.PASSWORD && token) {
      return (
        <NestedLayout
          title={formatMessage({ id: 'global.createNewPassword', defaultMessage: 'Create New Password' })}
          menuItems={[]}
        >
          <Card padding="l">
            <Flex flexDirection="column" width={isTabletOrPhone ? 'auto' : 500}>
              <ResetPasswordForm onSubmit={onSubmit} token={token} />
            </Flex>
          </Card>
        </NestedLayout>
      );
    }

    return <AnimatedLoader />;
  };

  return (
    <Layout
      title={formatMessage({
        id: 'validation',
        defaultMessage: 'Validation',
      })}
    >
      {render()}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = wrapperServerSideProps(async ({ context, store }) => {
  const { query } = context;

  const { action, token } = query;

  const parsedToken = token ? `${token}` : undefined;

  if (action === EAuthenticationTicketTypes.EMAIL && parsedToken) {
    try {
      const { data } = await store.dispatch(verifyEmail.initiate(parsedToken, { forceRefetch: true }));

      return {
        props: {
          action,
          isValid: data?.success || false,
        },
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error verifying email:', error);

      return {
        props: {
          action,
          isValid: false,
        },
      };
    }
  }

  if (action === EAuthenticationTicketTypes.PASSWORD && parsedToken) {
    return {
      props: {
        action,
        isValid: true,
        token,
      },
    };
  }

  return {
    props: {
      action,
      isValid: false,
    },
  };
});

export default Verification;
