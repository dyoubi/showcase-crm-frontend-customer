import { memo, ReactNode, useMemo, useState } from 'react';

import { Modal } from '@/core/shared/Modal';
import { useToggle } from '@/core/hooks/useToggle';

import { ConfirmationModalContext } from './context';
import { DisplayModalState } from './types';

interface ConfirmationModalProviderProps {
  children?: ReactNode;
}

export const DisplayModalProvider = memo(({ children }: ConfirmationModalProviderProps) => {
  const [display, toggleDisplay] = useToggle();
  const [state, setState] = useState<DisplayModalState>({});

  const value = useMemo(
    () => ({
      displayModal: (params: DisplayModalState) => {
        setState(params);
        toggleDisplay();
      },
      toggleDisplay,
    }),
    [setState, toggleDisplay],
  );

  return (
    <ConfirmationModalContext.Provider value={value}>
      {children}
      <Modal {...state} isOpen={display} setIsOpen={toggleDisplay}>
        {state.content}
      </Modal>
    </ConfirmationModalContext.Provider>
  );
});
