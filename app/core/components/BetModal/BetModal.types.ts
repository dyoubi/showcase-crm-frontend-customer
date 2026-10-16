import { Bet } from '@/core/domains/transaction';
import { ModalProps } from '@/core/shared/Modal/Modal.types';

export type BetModalProps = ModalProps & {
  bet?: Bet;
};
