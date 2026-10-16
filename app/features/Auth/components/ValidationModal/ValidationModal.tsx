import { FC, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useIntercom } from 'react-use-intercom';

import { ButtonSize } from '@/core/shared/Button/Button.types';

import { Container, Content, StyledButton, StyledHeading, StyledModal } from './ValidationModal.styles';
import { ValidationModalProps } from './ValidationModal.types';

export const ValidationModal: FC<ValidationModalProps> = ({ isOpen, setIsOpen, onSubmit, eventData }) => {
  const { trackEvent } = useIntercom();

  useEffect(() => {
    if (eventData) {
      // This is done because when you create a boot as done in parent component, then this event call returns 404 as user is not found
      setTimeout(() => {
        trackEvent('user_register', eventData);
      }, 2000);
    }
  }, [eventData]);

  return (
    <StyledModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <StyledHeading size="h1">
          <FormattedMessage id="validationModal.header" defaultMessage="All Good!" />
        </StyledHeading>
        <Content>
          <FormattedMessage
            id="registerForm.successDialogCopy"
            defaultMessage="Your account has been successfully created.
            We’ve sent you an email with an activation link.
            Click the link to activate your account and start playing!"
          />
        </Content>
        <StyledButton size={ButtonSize.Medium} onClick={onSubmit}>
          <FormattedMessage id="validationModal.checkYourEmail" defaultMessage="Check your email" />
        </StyledButton>
      </Container>
    </StyledModal>
  );
};
