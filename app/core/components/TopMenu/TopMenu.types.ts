import { ReactNode } from 'react';

export type TopMenuProps = {
  isLogged?: boolean;
  children?: ReactNode;
};

export type TopMenuWalletProps = {
  children?: ReactNode;
  toggleWalletModalOpen: () => void;
};
