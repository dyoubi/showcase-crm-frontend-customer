import { ModalProps } from '@/core/shared/Modal/Modal.types';
import { CryptoCodes } from '@/core/domains/currency';

export type BonusClaimModalProps = ModalProps;

export type BonusOption = {
  label: JSX.Element;
  value: CryptoCodes;
};
