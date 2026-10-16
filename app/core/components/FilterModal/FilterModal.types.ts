import { ModalProps } from '@/core/shared/Modal';

export interface FilterModalProps extends ModalProps {
  onSubmit: (providers: Array<string>) => void;
}
