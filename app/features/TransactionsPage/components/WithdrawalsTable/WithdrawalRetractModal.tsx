import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSession } from 'next-auth/react';

import { Modal, ModalProps } from '@/core/shared/Modal';
import { Heading, Text } from '@/core/components/Typography';
import { Box, Button, Flex, Spacer } from '@/core/shared';
import { ButtonColor, ButtonSize } from '@/core/shared/Button/Button.types';
import { IconLoader } from '@/core/shared/Icons';
import { usePostWithdrawRetractMutation, WithdrawalTransaction } from '@/core/domains/transaction';
import { useGetPlayerBalancesQuery } from '@/core/domains/balance';

import { useNotification } from '@/utils/notifications/notification-context';

interface WithdrawalModalProps extends ModalProps {
  withdrawalId?: WithdrawalTransaction['id'];
}

export const WithdrawalRetractModal = (props: WithdrawalModalProps) => {
  const { isOpen, setIsOpen, withdrawalId } = props;

  const { formatMessage } = useIntl();
  const { addNotification } = useNotification();
  const [postWithdrawRetract, { isSuccess, isError, isLoading }] = usePostWithdrawRetractMutation();
  const { data: session } = useSession();

  const { refetch: refetchUserBalances } = useGetPlayerBalancesQuery(undefined, {
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
      refetchUserBalances();
      addNotification({
        text: formatMessage({
          id: 'success.withdrawRetract',
          defaultMessage: 'Your withdrawal request has been retracted',
        }),
        type: 'success',
        title: formatMessage({ id: 'notification.successTitle', defaultMessage: 'Success' }),
      });
    }

    if (isError) {
      setIsOpen(true);

      addNotification({
        text: formatMessage({ id: 'error.somethingWentWrong', defaultMessage: 'Something went wrong' }),
        type: 'error',
        title: formatMessage({ id: 'notification.errorTitle', defaultMessage: 'Error' }),
      });
    }
  }, [isSuccess, isError]);

  const handleRetractDemand = async () => {
    if (!withdrawalId) {
      return;
    }

    await postWithdrawRetract({
      accessToken: session?.accessToken,
      withdrawalId,
    });
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} hasCloseButton={false}>
      <Box mb="l">
        <Heading align="center" size="h3">
          <FormattedMessage defaultMessage="Do You Want To Retract Your Withdrawal?" id="withdrawal.retractTitle" />
        </Heading>
      </Box>

      <Flex justifyContent="flex-end">
        <Button color={ButtonColor.Tertiary} onClick={() => setIsOpen(false)} size={ButtonSize.Small}>
          <Text level="medium">
            <FormattedMessage id="global.cancel" defaultMessage="Cancel" />
          </Text>
        </Button>
        <Spacer />

        <Button
          color={ButtonColor.Secondary}
          disabled={isLoading}
          onClick={handleRetractDemand}
          size={ButtonSize.Small}
        >
          <Text level="medium">
            <FormattedMessage id="global.retract" defaultMessage="Retract" />
          </Text>

          {isLoading ? (
            <>
              <Spacer size="xxs" />
              <IconLoader size={20} />
            </>
          ) : null}
        </Button>
      </Flex>
    </Modal>
  );
};
