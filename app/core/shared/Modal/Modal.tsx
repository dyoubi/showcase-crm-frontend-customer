import { FC, isValidElement, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { IconClose } from '@/core/shared/Icons';

import {
  ClickBarrier,
  CloseButton,
  ModalHeader,
  ModalStyle,
  ModalTitle,
  ModalWrapper,
  StyledOverlay,
} from './Modal.styles';
import { ModalProps } from './Modal.types';
import { Spacer } from '../Spacer';

export const Modal: FC<ModalProps> = ({
  setIsOpen,
  isOpen,
  children,
  fullWidth,
  hasCloseButton = true,
  header,
  overlayStyle,
  ...props
}) => {
  useEffect(() => {
    if (isOpen && document.body) {
      const originalOverflow = document.body.style.overflow;

      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [isOpen]);

  if (!isOpen) return null;

  const hasHeader = !!(header || hasCloseButton);

  const handleClose = () => setIsOpen(false);

  const renderHeader = () => {
    if (!hasHeader) {
      return null;
    }

    return (
      <ModalHeader alignItems="center" data-testid="bp-modal-header">
        {renderTitle()}

        {hasCloseButton ? (
          <CloseButton onClick={handleClose} data-testid="bp-modal-close_button">
            <IconClose color="white" />
          </CloseButton>
        ) : null}
      </ModalHeader>
    );
  };

  const renderTitle = () => {
    if (!header) {
      return <Spacer size="xxxs" data-testid="bp-modal-title_space" />;
    }

    if (isValidElement(header)) {
      return header;
    }

    return (
      <ModalTitle hasCloseButton={hasCloseButton} size="h4" data-testid="bp-modal-title">
        {header}
      </ModalTitle>
    );
  };

  return createPortal(
    <StyledOverlay onClick={handleClose} isOpen={isOpen} overlayStyle={overlayStyle} data-testid="bp-modal-overlay">
      <ModalWrapper>
        <ClickBarrier onClick={(event) => event.stopPropagation()}>
          <ModalStyle hasHeader={!!(header || hasCloseButton)} fullWidth={fullWidth} {...props}>
            {renderHeader()}
            {children}
          </ModalStyle>
        </ClickBarrier>
      </ModalWrapper>
    </StyledOverlay>,
    document.body,
  );
};
