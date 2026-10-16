import React from 'react';

import * as t from './types';

interface DisplayModalContextType {
  displayModal: (options: t.DisplayModalState) => void;
  toggleDisplay: () => void;
}

export const ConfirmationModalContext = React.createContext<DisplayModalContextType | undefined>(undefined);
