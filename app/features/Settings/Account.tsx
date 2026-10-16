import React from 'react';

import { BetLimitsForm } from './components/BetLimitsForm';
import { FreezeAndExclusionForm } from './components/FreezeAndExclusionForm';

export const Account = () => {
  return (
    <>
      <BetLimitsForm />
      <FreezeAndExclusionForm />
    </>
  );
};
