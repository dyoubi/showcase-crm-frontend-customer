export interface WithdrawModalForm {
  currency: string;
  address: string;
  amount: number;
}

export type WithdrawModalProps = {
  setIsOpen: (newState: boolean) => void;
};
