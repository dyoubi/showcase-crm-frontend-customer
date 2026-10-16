import { useContext } from 'react';

import { ConfirmationModalContext } from '@/core/components/DisplayModalProvider/context';

export const useDisplayModal = () => {
  const context = useContext(ConfirmationModalContext);

  if (!context) {
    throw new Error('useDisplayModal must be within DisplayModalProvider.Provider');
  }

  return context;
};
