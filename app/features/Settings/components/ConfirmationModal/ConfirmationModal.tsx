import { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider } from '@/core/shared/Divider';
import { Flex, Modal } from '@/core/shared';

import { ConfirmationModalProps } from './ConfirmationModal.types';
import { ConfirmationButton } from './ConfirmationModal.styles';

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  children,
  onClick,
  hasSaveButton = true,
  ...props
}) => (
  <Modal {...props}>
    {children}

    {hasSaveButton ? (
      <>
        <Divider mb="m" mt="m" />

        <Flex justifyContent="center">
          <ConfirmationButton onClick={onClick}>
            <FormattedMessage id="confirmationModal.confirm" defaultMessage="I understand" />
          </ConfirmationButton>
        </Flex>
      </>
    ) : null}
  </Modal>
);
