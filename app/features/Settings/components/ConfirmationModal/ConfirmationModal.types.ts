import { ReactNode } from 'react';

import { ModalProps } from '@/core/shared/Modal';

export type ConfirmationModalProps = ModalProps & {
  children: ReactNode;
  idForHeader?: string;
  isOpen: boolean;
  hasSaveButton?: boolean;
  setIsOpen: (newState: boolean) => void;
  onClick?: () => void;
};
