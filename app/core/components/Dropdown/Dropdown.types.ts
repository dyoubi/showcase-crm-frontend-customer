import { ReactElement, ReactNode } from 'react';

export interface DropdownProps {
  children?: ReactNode;
  content?: ReactElement;
  zIndex?: number;
  className?: string;
  disabled?: boolean;
  contentPosition?: 'left' | 'right' | 'center';
  isClosed?: boolean;
  toggleOnSelection?: boolean;
  fullWidth?: boolean;
  onToggle?: (isOpen: boolean) => void;
  isOpenByDefault?: boolean;
  toggleOnClickOutside?: boolean;
}
