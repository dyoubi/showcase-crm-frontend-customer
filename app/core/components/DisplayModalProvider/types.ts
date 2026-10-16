import { ReactNode } from 'react';

import { ModalProps } from '@/core/shared/Modal';

export interface DisplayModalState extends Omit<ModalProps, 'setIsOpen' | 'isOpen'> {
  content?: ReactNode;
}
