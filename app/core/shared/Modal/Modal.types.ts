import { ReactNode } from 'react';

export enum OverlayStyle {
  Blur = 'blur',
}

export type ModalStyleProps = {
  fullWidth?: boolean;
  hasHeader?: boolean;
  className?: string;
};

export type ModalProps = {
  hasCloseButton?: boolean;
  header?: ReactNode | string;
  isOpen: boolean;
  setIsOpen: (newState: boolean) => void;
  overlayStyle?: OverlayStyle;
  children?: ReactNode;
  actionButton?: ReactNode;
} & ModalStyleProps;

export type ModalHeaderProps = {
  center?: boolean;
  hasCloseButton?: boolean;
  actionButton?: React.ReactNode;
};
